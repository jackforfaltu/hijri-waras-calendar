(function () {
  "use strict";

  describe("HijriDate", function () {
    describe("isJulian", function () {
      it("expects 31st December 1581AD to be a Julian day", function () {
        var date = new Date(1581, 12, 31);
        expect(HijriDate.isJulian(date)).toBeTruthy();
      });

      it("expects 4th October 1582AD to be a Julian day", function () {
        var date = new Date(1582, 10, 4);
        expect(HijriDate.isJulian(date)).toBeTruthy();
      });

      it("expects 5th October 1582AD not to be a Julian day", function () {
        var date = new Date(1582, 10, 5);
        expect(HijriDate.isJulian(date)).toBeFalsy();
      });

      it("expects 1st January 1583AD not to be a Julian day", function () {
        var date = new Date(1583, 1, 1);
        expect(HijriDate.isJulian(date)).toBeFalsy();
      });
    });

    describe("gregorianToAJD", function () {
      it("expects 25th March 2011 to be AJD 2455645.5", function () {
        var date = new Date(2011, 3, 25);
        expect(HijriDate.gregorianToAJD(date)).toEqual(2455645.5);
      });
    });

    describe("ajdToGregorian", function () {
      it("expects AJD 2455645.5 to be 25th March 2011", function () {
        var date = new Date(2011, 3, 25);
        expect(HijriDate.ajdToGregorian(2455645.5)).toEqual(date);
      });
    });

    describe("isKabisa", function () {
      it("expects 1434H to be a Kabisa year", function () {
        expect(HijriDate.isKabisa(1434)).toBeTruthy();
      });

      it("expects 1432H not to be a Kabisa year", function () {
        expect(HijriDate.isKabisa(1432)).toBeFalsy();
      });
    });

    describe("daysInMonth", function () {
      it("expects Ramazaan 1432H to contain 30 days", function () {
        expect(HijriDate.daysInMonth(1432, 9)).toEqual(30);
      });

      it("expects Zilhaj 1432H to contain 29 days", function () {
        expect(HijriDate.daysInMonth(1432, 12)).toEqual(29);
      });

      it("expects Zilhaj 1434H to contain 30 days", function () {
        expect(HijriDate.daysInMonth(1434, 12)).toEqual(30);
      });
    });

    describe("dayOfYear", function () {
      it("expects 10th Moharram 1432H to be the 10th day of the year", function () {
        var date = new HijriDate(1432, 1, 10);
        expect(date.dayOfYear()).toEqual(10);
      });

      it("expects 10th Ramazaan 1432H to be the 246th day of the year", function () {
        var date = new HijriDate(1432, 9, 10);
        expect(date.dayOfYear()).toEqual(246);
      });

      it("expects 30th Zilhaj 1434H to be the 355th day of the year", function () {
        var date = new HijriDate(1434, 12, 30);
        expect(date.dayOfYear()).toEqual(355);
      });
    });

    describe("fromAJD", function () {
      it("expects AJD 2455645.5 to be 20th Rabi al-Aakhar 1432H", function () {
        var date = new HijriDate(1432, 4, 20);
        expect(HijriDate.fromAJD(2455645.5)).toEqual(date);
      });
    });

    describe("toAJD", function () {
      it("expects 20th Rabi al-Aakhar 1432H to be AJD 2455645.5", function () {
        var date = new HijriDate(1432, 4, 20);
        expect(date.toAJD()).toEqual(2455645.5);
      });
    });

    describe("fromGregorian", function () {
      it("expects 25th March 2011 to be 20th Rabi al-Aakhar 1432H", function () {
        var gregorianDate = new Date(2011, 3, 25),
            hijriDate = new HijriDate(1432, 4, 20);
        expect(HijriDate.fromGregorian(gregorianDate)).toEqual(hijriDate);
      });
    });

    describe("toGregorian", function () {
      it("expects 20th Rabi al-Aakhar 1432H to be 25th March 2011", function () {
        var gregorianDate = new Date(2011, 3, 25),
            hijriDate = new HijriDate(1432, 4, 20);
        expect(hijriDate.toGregorian()).toEqual(gregorianDate);
      });
    });
  });
})();