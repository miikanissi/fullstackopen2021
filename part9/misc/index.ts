import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());


interface ExercisesRequestData {
  daily_exercises: Array<number>;
  target: number;
}

app.get('/hello', (_req: any, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: any, res: Response) => {
    if(!req.query.height || !req.query.weight || isNaN(Number(req.query.height || isNaN(Number(req.query.height))))) {
        res.status(400).json({ error: 'malformatted parameters'});
    } else {
        const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight));
        res.json({
            weight: Number(req.query.height),
            height: Number(req.query.weight),
            bmi: bmi
        });
    }
});


app.post('/exercises', (req: Request<unknown, unknown, ExercisesRequestData>, res: Response) => {
    const daily_exercises: Array<number> = req.body.daily_exercises;
    const target = Number(req.body.target);


    if (!daily_exercises || !target) {
        res.status(400).json({ error: 'parameters missing'});
    }

    if(!Array.isArray(daily_exercises) || isNaN(target)) {
        res.status(400).json({ error: 'malformatted parameters'});
    }

    for (let i = 0; i < daily_exercises.length; i++) {
        if (isNaN(Number(daily_exercises[i]))) {
            res.status(400).json({error: 'malformatted parameters'});
        }
    }
    const result = calculateExercises(target, daily_exercises);
    res.status(200).json(result);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
