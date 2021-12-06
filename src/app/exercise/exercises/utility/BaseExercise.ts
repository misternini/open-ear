import {
  Exercise,
} from '../../Exercise';
import * as _ from 'lodash';
import AnswerList = Exercise.AnswerList;
import SettingValueType = Exercise.SettingValueType;
import ExerciseExplanationContent = Exercise.ExerciseExplanationContent;

export abstract class BaseExercise<GAnswer extends string = string, GSettings extends { [key: string]: SettingValueType } = { [key: string]: SettingValueType }> implements Exercise.IExercise<GAnswer, GSettings> {
  abstract readonly id: string;
  abstract readonly summary: string;
  abstract readonly name: string;
  abstract readonly explanation: ExerciseExplanationContent;
  /**
   * Implementor should implement the desired default settings
   * */
  protected abstract _settings: GSettings;

  abstract getAnswerList(): AnswerList<GAnswer>;

  abstract getQuestion(): Exercise.Question<GAnswer>;

  updateSettings(settings: GSettings): void {
    this._settings = settings;
  }

  getCurrentSettings(): GSettings {
    return this._settings;
  }
}
