describe("FilterDomain", function () {
    var catalog = null;
    var $rootScope = null;
    var $compile = null;

    beforeEach(module("gettext"));

    beforeEach(inject(function ($injector, gettextCatalog) {
        $rootScope = $injector.get("$rootScope");
        $compile = $injector.get("$compile");
        catalog = gettextCatalog;
        catalog.setStrings("nb", {
            Hello: "Hallo",
            "Hello {{name}}!": "Hallo {{name}}!",
            "One boat": ["En båt", "{{count}} båter"],
            Hey:  "Hei"
        });
        catalog.setStrings("nb", {
            Hello: "Heisann",
            "Hello {{name}}!": "Heisann {{name}}!"
        }, "test");

    }));

    it("Should have a translateDomain filter", function () {
        var el = $compile("<h1>{{\"Hello!\"|translateDomain:'test'}}</h1>")($rootScope);
        $rootScope.$digest();
        assert.equal(el.text(), "Hello!");
    });

    it("Should translate known strings for the domain", function () {
        catalog.currentLanguage = "nb";
        var el = $compile("<span>{{'Hello'|translateDomain:'test'}}</span>")($rootScope);
        $rootScope.$digest();
        assert.equal(el.text(), "Heisann");
    });

    it("Should not translate strings unknown for the domain", function () {
        catalog.currentLanguage = "nb";
        var el = $compile("<span>{{'Hey'|translateDomain:'test'}}</span>")($rootScope);
        $rootScope.$digest();
        assert.equal(el.text(), "Hey");
    });

    it("Should not translate strings unknown for the domain but known to the default domain", function () {
        catalog.currentLanguage = "nb";
        var el = $compile("<span>{{'Hey'|translateDomain:'test'}}</span>")($rootScope);
        var elNoDomain = $compile("<span>{{'Hey'|translateDomain}}</span>")($rootScope);

        $rootScope.$digest();
        assert.equal(el.text(), "Hey");
        assert.equal(elNoDomain.text(), "Hei");
    });

    it("Can use filter in attribute values", function () {
        catalog.currentLanguage = "nb";
        var el = $compile("<input type=\"text\" placeholder=\"{{'Hello'|translateDomain:'test'}}\" />")($rootScope);
        $rootScope.$digest();
        assert.equal(el.attr("placeholder"), "Heisann");
    });
});
