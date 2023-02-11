import { NgModule } from "@angular/core";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [],
    imports: [ScrollingModule, FormsModule],
    exports: [ScrollingModule, FormsModule]
})
export class SharedModule {}
