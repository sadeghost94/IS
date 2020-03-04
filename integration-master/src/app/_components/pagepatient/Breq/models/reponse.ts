import {Regulation} from './regulation';

export class Reponse {

  questionId: number;
  quizId: number;
  poids: number;


  constructor( quizId: number, questionId: number,  poids: number) {
    this.questionId = questionId;
    this.quizId = quizId;
    this.poids = poids;
  }

}
