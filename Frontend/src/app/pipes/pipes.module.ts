import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';

@NgModule({
  declarations: [FiltroPipe, ImageSanitizerPipe],
  exports : [FiltroPipe,ImageSanitizerPipe]
})
export class PipesModule { }
