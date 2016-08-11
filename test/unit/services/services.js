describe('services', function() {

    beforeEach(module("webApp"));

    var getReposForUserService,
        deffered = null;
 
    beforeEach(inject(function(getReposForUserService, $injector, _$q_){ 
        $httpBackend = $injector.get('$httpBackend');
        deffered = _$q_.defer();
        getReposForUserService = getReposForUserService;
        
        $httpBackend.when('GET', 'https://api.github.com/users/mafina/repos').respond();        
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('getRepos method should be defined', angular.mock.inject(function(getReposForUserService){
        expect(getReposForUserService.getRepos).toBeDefined();
    }));
 
    it('getRepos method should return promise', angular.mock.inject(function(getReposForUserService){
        expect(getReposForUserService.getRepos('mafina')).toEqual(deffered.promise);        
        $httpBackend.expectGET('https://api.github.com/users/mafina/repos');
        $httpBackend.flush();        
    }));

});