weatherApp
    .service('forecastService', function () {
        this.city = 'Odessa, UA';
        this.days = 2;
    })
    .service('weatherService', ['$resource', function ($resource) {

        this.getWeaher = function (city, days) {
            
            var appID = 'f32952867d281b57fb7258506f03923c';
            
            var weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily/', {
                callback: 'JSON_CALLBACK'
            }, {
                get: {
                    method: 'JSONP'
                }
            });

            return weatherAPI.get({
                q: city,
                cnt: days,
                appid: appID
            });
        }
    }]);