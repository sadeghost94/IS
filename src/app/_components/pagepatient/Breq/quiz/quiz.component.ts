import {Component, OnInit} from '@angular/core';

import {QuizService} from '../services/quiz.service';
import {HelperService} from '../services/helper.service';
import {Option, Question, Quiz, QuizConfig} from '../models';
import {Reponse} from '../models/reponse';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizes: any[];
  regulations: any [];
  rep: Reponse[] = [];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string = 'breq.json';
  poid = 0;
  poid1 = 0;
  poid2 = 0;
  poid3 = 0;
  poid4 = 0;
  introjected_regulation = 0;
  amotivation_regulation = 0;
  identified_regulation = 0;
  external_regulation = 0;
  intrinsic_regulation = 0;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': true,  // if true, it will move to next question automatically when answered.
    'duration': 600,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {


   /* this.quizName = this.quizes[0].id;*/
    console.log(this.quizName)
    this.loadQuiz(this.quizName);

  }

  loadQuiz(quizName: string) {
    this.quizService.get('breq.json').subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => {
        this.tick();
      }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.mode = 'result';
      //this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => {
        if (x.id !== option.id) {
          x.selected = false;
        } else {
          this.rep.push(new Reponse(
            this.quiz.id,
            question.id,
            option.poids));

          console.log(this.rep);
          this.score(question, option);
        }
      });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goBack(index: number) {
    this.ellapsedTime = '00:00';
    this.mode = 'quiz';

    console.log(this.mode);
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }

  goTo(index: number) {

    if (index >= 0 && index < this.pager.count) {
      this.ellapsedTime = '00:00';
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  reponse(question: Question) {
    return question.options.find(x => x.selected) ? 'repondu' : 'non repondu';

  }

  score(question: Question, option: Option) {

  if (question.regulation.id === 1) {

      this.amotivation_regulation = this.amotivation_regulation + 1;
      this.poid = option.poids + this.poid;
      console.log(this.poid);
      console.log(this.amotivation_regulation);
    } else if (question.regulation.id === 2) {
      this.external_regulation = this.external_regulation + 1;
      this.poid1 = option.poids + this.poid1;
      console.log(this.poid1);
      console.log(this.external_regulation);
    } else if (question.regulation.id === 3) {
      this.introjected_regulation = this.introjected_regulation + 1;
      this.poid2 = option.poids + this.poid2;
      console.log(this.poid2);
      console.log(this.introjected_regulation);
    } else if (question.regulation.id === 4) {
      this.identified_regulation = this.identified_regulation + 1;
      this.poid3 = option.poids + this.poid3;
      console.log(this.poid3);
      console.log(this.identified_regulation);
    } else if (question.regulation.id === 5) {
      this.intrinsic_regulation = this.intrinsic_regulation + 1;
      this.poid4 = option.poids + this.poid4;
      console.log(this.poid4);
      console.log(this.intrinsic_regulation);
    }
    console.log(question.regulation.name);


  }

  onSubmit() {
    console.log(this.rep);
    const moy_amotivation = this.poid / this.amotivation_regulation;
    const moy_external = this.poid1 / this.external_regulation;
    const moy_introjected = this.poid2 / this.introjected_regulation;
    const moy_identified = this.poid3 / this.identified_regulation;
    const moy_intrinsic = this.poid4 / this.intrinsic_regulation;
    console.log(' score moyen Amotivation :' + moy_amotivation);
    console.log('  score moyen external_regulation : ' + moy_external);
    console.log(' score moyen introjected_regulation : ' + moy_introjected);
    console.log(' score moyen identified_regulation : ' + moy_identified);
    console.log(' score moyen intrinsic_regulation : ' + moy_intrinsic);

  }
}
