import Exercise from '../../exercise-logic';
import {
  randomFromList,
  Interval,
} from '../../utility';
import { ScaleIdentificationExplanationComponent } from './scale-identification-explanation/scale-identification-explanation.component';

import {
  PlayAfterCorrectAnswerSetting,
} from '../utility/settings/PlayAfterCorrectAnswerSetting';
import {
  IncludedAnswersSettings,
  includedAnswersSettings,
} from '../utility/settings/IncludedAnswersSettings';
import { transpose } from '../../utility/music/transpose';
import { composeExercise } from '../utility/exerciseAttributes/composeExercise';
import { createExercise } from '../utility/exerciseAttributes/createExercise';
import * as _ from 'lodash';

export type ScaleIdSettings = IncludedAnswersSettings<Scale> &
  PlayAfterCorrectAnswerSetting 

export type Scale = DiatonicMode | AlteredMinor | BebopScale | MessianScale;


export type DiatonicMode =
  | 'Ionian'
  | 'Dorian'
  | 'Phrygian'
  | 'Lydian'
  | 'Mixolydian'
  | 'Aeolian'
  | 'Locrian';

export type AlteredMinor =
  | 'Melodic Minor'
  | 'Harmonic Minor';

export type BebopScale =
  | 'Aeolian Blues'
  | 'Dorian Blues'
  | 'Major Bebop'
  | 'Mixolydian Bebop';

export type MessianScale = 
| 'Whole'
| 'Whole-Half'
| 'Half-Whole';


export function getHalfStepIntervalsOfScale(scale: Scale): number[] {
  const scale_map = {
      'Ionian': [0, 2, 4, 5, 7, 9, 11],
      'Dorian': [0, 2, 3, 5, 7, 9, 10],
      'Phrygian': [0, 1, 3, 5, 7, 8, 10],
      'Lydian': [0, 2, 4, 6, 7, 9, 11],
      'Mixolydian': [0, 2, 4, 5, 7, 9, 10],
      'Aeolian': [0, 2, 3, 5, 7, 8, 10],
      'Locrian': [0, 1, 3, 5, 6, 8, 10],
      'Melodic Minor': [0, 2, 3, 5, 7, 9, 11],
      'Harmonic Minor': [0, 2, 3, 5, 7, 8, 11],
      'Aeolian Blues': [0, 2, 3, 5, 6, 7, 8, 11],
      'Dorian Blues': [0, 2, 3, 5, 6, 7, 9, 11],
      'Major Bebop': [0, 2, 4, 5, 6, 7, 9, 11],
      'Mixolydian Bebop': [0, 2, 4, 5, 7, 9, 10, 11],
      'Whole': [0, 2, 4, 6, 8, 10],
      'Whole-Half': [0, 2, 3, 5, 6, 8, 9, 11],
      'Half-Whole': [0, 1, 3, 4, 6, 7, 9, 10]
  }; 
  return scale_map[scale];
}


export function scaleIdExercise() {


  const voiceRangeGap: Interval = Interval.MajorThird;

const allAnswerList: Exercise.AnswerList<Scale> = { rows: [ 
  ['Ionian', 'Dorian', 'Phrygian', 'Lydian'], 
  ['Mixolydian', 'Aeolian', 'Locrian'], 
  ['Melodic Minor', 'Harmonic Minor', 'Aeolian Blues'], 
  ['Dorian Blues', 'Major Bebop', 'Mixolydian Bebop'],
  ['Whole', 'Whole-Half', 'Half-Whole']]};


  return composeExercise(
    includedAnswersSettings<Scale>({
      defaultSelectedAnswers: ['Ionian', 'Aeolian'],
      name: 'Scales',
    }),
    createExercise
  )({
    id: 'scaleId',
    name: `Scales and Modes`,
    summary: `Identify scales and modes.`,
    answerList: allAnswerList,
    explanation: ScaleIdentificationExplanationComponent,
    getQuestion(
      settings: ScaleIdSettings,
    ): Exercise.NotesQuestion<Scale> {

      const scaleChosenForQuestion: Scale = randomFromList(settings.includedAnswers);

      const startNote = transpose('C3', _.random(0, 24));

      return {
        segments: [{ partToPlay: getHalfStepIntervalsOfScale(scaleChosenForQuestion).map((semitones:number) => ({ notes: transpose(startNote, semitones), duration: '2n' })).concat([{notes:transpose(startNote, 12), duration: '2n'}]), rightAnswer: scaleChosenForQuestion  }],
        info: startNote
      };
    },
    settingsDescriptors: [
    ],
    defaultSettings: {
      playAfterCorrectAnswer: true,
    },
  });
}
