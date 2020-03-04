
export class BloodPressureDto {

   bloodPressureRightHand : number;
   bloodPressureLeftHand : number;

  constructor(blood_pressure_rightHand: number, blood_pressure_left_hand: number) {
    this.bloodPressureRightHand = blood_pressure_rightHand;
    this.bloodPressureLeftHand = blood_pressure_left_hand;
  }
}
