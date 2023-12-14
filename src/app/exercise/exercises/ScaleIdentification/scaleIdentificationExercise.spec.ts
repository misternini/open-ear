import { testExercise } from '../testing-utility/test-exercise.spec';
import { expectedTonalExerciseSettingsDescriptors } from '../utility/exerciseAttributes/tonalExercise.spec';
import { ScaleIdSettings, scaleIdExercise } from './scaleIdentificationExercise';

describe(scaleIdExercise.name, () => {
  const context = testExercise<ScaleIdSettings>({
    getExercise: scaleIdExercise,
    settingDescriptorList: [
      ...expectedTonalExerciseSettingsDescriptors,
      'Included Scale Degrees',
      'Display',
      'Range',
      'Number of notes',
      'Number of voices',
      'Harmonic Intervals',
      'Play Resolution',
    ],
  });

  it(`getQuestion with multiple voices`, () => {
    console.log('context', context);
    const defaultSettings = context.exercise.getCurrentSettings?.();
    const settings: ScaleIdSettings = {
      ...defaultSettings!,
      key: 'random',
      newKeyEvery: 1,
    };

    for (let range of ['high', 'middle', 'bass', 'contrabass'] as const) {
      for (let numberOfVoices of [2, 3] as const) {
        context.exercise.updateSettings?.({
          ...settings,
          notesRange: range,
          numberOfVoices,
        });
        expect(() => context.exercise.getQuestion()).not.toThrow();
      }
    }
  });
});
