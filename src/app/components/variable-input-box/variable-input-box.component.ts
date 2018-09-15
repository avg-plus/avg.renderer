import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AnimationUtils } from "app/common/animations/animation-utils";
import * as avg from "avg-engine/engine";

@Component({
  selector: "variable-input-box",
  templateUrl: "./variable-input-box.component.html",
  styleUrls: ["./variable-input-box.component.scss"]
})
export class VariableInputComponent implements OnInit, AfterViewInit {
  inputData: avg.InputData = undefined;
  inputValue: string | number;
  private _complete: (isOk: boolean, value: string | number) => void;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  public show(data: avg.InputData,
              onCompleted: (isOk: boolean, value: string | number) => void) {
    this.inputData = data;
    this._complete = onCompleted;

    this.changeDetectorRef.detectChanges();

    AnimationUtils.fadeTo("#input-box-container", 300, 1);
  }

  private close() {
    AnimationUtils.fadeTo("#input-box-container", 100, 0, () => {
      this.inputData = undefined;
      this._complete = undefined;
    });
  }

  public onOk() {
    if (
      !this.inputValue ||
      this.inputValue.toString().length < this.inputData.minLength ||
      this.inputValue.toString().length > this.inputData.maxLength
    ) {
      return;
    }

    if (this._complete) {
      this._complete(true, this.inputValue);
    }
    this.close();
  }

  public onCancel() {
    if (this._complete) {
      this._complete(false, this.inputValue);
    }
    this.close();
  }
}
