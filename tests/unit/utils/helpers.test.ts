import { buildUrlFromStr, getPrettyUrl } from "utils/helpers";

describe("getPrettyUrl", () => {
  it("removes the http protocol", () => {
    expect(getPrettyUrl("http://slashdot.org")).toEqual("slashdot.org");
  });
  it("removes the https protocol", () => {
    expect(getPrettyUrl("https://slashdot.org")).toEqual("slashdot.org");
  });
  it("doesn't alter the url if no protocol is provided", () => {
    expect(getPrettyUrl("slashdot.org")).toEqual("slashdot.org");
  });
});

describe("buildUrlFromStr", () => {
  it("returns the same string when it begins with an http protocol", () => {
    expect(buildUrlFromStr("http://foo.com")).toEqual("http://foo.com");
    expect(buildUrlFromStr("https://foo.com")).toEqual("https://foo.com");
  });
  it("prepends https when it doesn't begin with protocol", () => {
    expect(buildUrlFromStr("foo.com")).toEqual("https://foo.com");
  });
});
