describe('URL', function() {
  var URL, location;

  beforeEach(function() {
    location = {};

    module('am', function($provide) {
      $provide.value('$location', location);
    });

    inject(function($injector) {
      URL = $injector.get('URL');
    });
  });

  describe('#getCenter', function() {
    it('is object with lat and lng', function() {
      location.path = function() { return '/-30.680,152.505'; };

      expect(URL.getCenter()).toEqual({lat: '-30.680', lng: '152.505'});
    });

    it('is default', function() {
      location.path = function() { return '/'; };

      expect(URL.getCenter('default')).toBe('default');
    });
  });

  describe('#setCenter', function() {
    it('fixes to 3 decimal places', function() {
      location.path = angular.noop;
      spyOn(location, 'path');

      URL.setCenter({lat: -30.680384384, lng: 152.505393583});

      expect(location.path).toHaveBeenCalledWith('/-30.680,152.505');
    });
  });
});

describe('SiteCollection', function() {
  var SiteCollection;

  beforeEach(function() {
    module('am');

    inject(function($injector) {
      SiteCollection = $injector.get('SiteCollection');
    });
  });

  describe('#open', function() {
    var newSite, oldSite;

    beforeEach(function() {
      newSite = {open: false};
      oldSite = {open: true};

      SiteCollection.sites = [oldSite, newSite];
      SiteCollection.open(newSite);
    });

    it('sets new site as open', function() {
      expect(newSite.open).toBeTruthy();
    });

    it('sets old site as closed', function() {
      expect(oldSite.open).toBeFalsy();
    });
  });
});

describe('SiteResource', function() {
  var SiteResource;

  beforeEach(function() {
    module('am');

    inject(function($injector) {
      SiteResource = $injector.get('SiteResource');
    });
  });

  describe('#isNear', function() {
    var position;

    beforeEach(function() {
      position = {lat: -27.574301, lng: 153.065193};
    });

    it('is less than 25,000m', function() {
      var site = new SiteResource({latitude: -27.4661111111111, longitude: 152.946388888889});

      expect(site.isNear(position)).toBeTruthy();
    });

    it('is less than 50,000m', function() {
      var site = new SiteResource({latitude: -27.9711111111111, longitude: 153.212222222222});

      expect(site.isNear(position)).toBeTruthy();
    });

    it('is less than 150,000m', function() {
      var site = new SiteResource({latitude: -26.7913888888889, longitude: 152.917222222222});

      expect(site.isNear(position)).toBeTruthy();
    });
  });
});
