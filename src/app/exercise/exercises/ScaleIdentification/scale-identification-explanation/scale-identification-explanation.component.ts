import { Component } from '@angular/core';
import { NoteEvent } from '../../../../services/player.service';
import { IV_V_I_CADENCE_IN_C } from '../../../utility/music/chords';
import { InfoPanelComponent } from '../../../../shared/components/shared-components/info-panel/info-panel.component';
import { CollapsibleComponent } from '../../../../shared/components/shared-components/collapsible/collapsible.component';
import { IonicModule } from '@ionic/angular';
import { PlayOnClickDirective } from '../../../../shared/components/shared-components/play-on-click.directive';

@Component({
  selector: 'app-scale-identification-explanation',
  templateUrl: './scale-identification-explanation.component.html',
  standalone: true,
  imports: [
    InfoPanelComponent,
    CollapsibleComponent,
    IonicModule,
    PlayOnClickDirective,
  ],
})
export class ScaleIdentificationExplanationComponent {};
