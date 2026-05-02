import { useState } from 'react';
import { type Player } from '../types/Player';
import { RoundResult} from './RoundResult';


interface QuizFormProps {
  players: Player[];
  currentUserId: string;
  correctPrice?: number;        // olemassa vain tulosvaiheessa
  onSubmitGuess: (guess: number) => void;
}

export function QuizForm({
  players,
  currentUserId,
  correctPrice,
  onSubmitGuess
}: QuizFormProps ) {
    
  const [guess, setGuess] = useState("");

  if (correctPrice !== undefined) {
    return (
      <RoundResult
        players={players}
        correctPrice={correctPrice}
      />
    );
  }


    return (
        <><p>Arvattavan tuotteen nimi: </p>
        <form
            onSubmit={e => {
                e.preventDefault();
                onSubmitGuess(Number(guess));
            } }
        >

            <input
                type="number"
                value={guess}
                onChange={e => setGuess(e.target.value)}
                placeholder="Arvaa hinta (€)"
                required />

            <button>Arvaa hinta {currentUserId}</button>
        </form></>
    );
}

export default QuizForm;