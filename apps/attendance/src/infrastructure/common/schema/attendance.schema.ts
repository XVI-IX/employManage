export class CreateAttendanceInput {
  employeeId: string;
}

export class CheckOutInput {
  employeeId: string;
  checkOut: Date | string;
}
