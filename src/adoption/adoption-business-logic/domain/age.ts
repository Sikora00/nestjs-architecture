export class Age {
  constructor(
    private readonly years: number,
    private readonly months: number,
  ) {}

  static oneYear(): Age {
    return new Age(1, 0);
  }

  static halfOfYear(): Age {
    return new Age(0, 6);
  }

  isLessThan(age: Age): boolean {
    if (this.years < age.years) {
      return true;
    } else {
      if (this.years === age.years) {
        if (this.months < age.months) {
          return true;
        }
      }
    }

    return false;
  }
}
