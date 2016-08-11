describe('MainController', function() {

    var controllerScope,
    	getReposForUserService,
    	httpStatusCodes,
    	demoResponseData = '[{"id":65309930,"name":"test","full_name":"mafina/test","owner":{"login":"mafina","id":738687,"avatar_url":"https://avatars.githubusercontent.com/u/738687?v=3","gravatar_id":"","url":"https://api.github.com/users/mafina","html_url":"https://github.com/mafina","followers_url":"https://api.github.com/users/mafina/followers","following_url":"https://api.github.com/users/mafina/following{/other_user}","gists_url":"https://api.github.com/users/mafina/gists{/gist_id}","starred_url":"https://api.github.com/users/mafina/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/mafina/subscriptions","organizations_url":"https://api.github.com/users/mafina/orgs","repos_url":"https://api.github.com/users/mafina/repos","events_url":"https://api.github.com/users/mafina/events{/privacy}","received_events_url":"https://api.github.com/users/mafina/received_events","type":"User","site_admin":false},"private":false,"html_url":"https://github.com/mafina/test","description":null,"fork":false,"url":"https://api.github.com/repos/mafina/test","forks_url":"https://api.github.com/repos/mafina/test/forks","keys_url":"https://api.github.com/repos/mafina/test/keys{/key_id}","collaborators_url":"https://api.github.com/repos/mafina/test/collaborators{/collaborator}","teams_url":"https://api.github.com/repos/mafina/test/teams","hooks_url":"https://api.github.com/repos/mafina/test/hooks","issue_events_url":"https://api.github.com/repos/mafina/test/issues/events{/number}","events_url":"https://api.github.com/repos/mafina/test/events","assignees_url":"https://api.github.com/repos/mafina/test/assignees{/user}","branches_url":"https://api.github.com/repos/mafina/test/branches{/branch}","tags_url":"https://api.github.com/repos/mafina/test/tags","blobs_url":"https://api.github.com/repos/mafina/test/git/blobs{/sha}","git_tags_url":"https://api.github.com/repos/mafina/test/git/tags{/sha}","git_refs_url":"https://api.github.com/repos/mafina/test/git/refs{/sha}","trees_url":"https://api.github.com/repos/mafina/test/git/trees{/sha}","statuses_url":"https://api.github.com/repos/mafina/test/statuses/{sha}","languages_url":"https://api.github.com/repos/mafina/test/languages","stargazers_url":"https://api.github.com/repos/mafina/test/stargazers","contributors_url":"https://api.github.com/repos/mafina/test/contributors","subscribers_url":"https://api.github.com/repos/mafina/test/subscribers","subscription_url":"https://api.github.com/repos/mafina/test/subscription","commits_url":"https://api.github.com/repos/mafina/test/commits{/sha}","git_commits_url":"https://api.github.com/repos/mafina/test/git/commits{/sha}","comments_url":"https://api.github.com/repos/mafina/test/comments{/number}","issue_comment_url":"https://api.github.com/repos/mafina/test/issues/comments{/number}","contents_url":"https://api.github.com/repos/mafina/test/contents/{+path}","compare_url":"https://api.github.com/repos/mafina/test/compare/{base}...{head}","merges_url":"https://api.github.com/repos/mafina/test/merges","archive_url":"https://api.github.com/repos/mafina/test/{archive_format}{/ref}","downloads_url":"https://api.github.com/repos/mafina/test/downloads","issues_url":"https://api.github.com/repos/mafina/test/issues{/number}","pulls_url":"https://api.github.com/repos/mafina/test/pulls{/number}","milestones_url":"https://api.github.com/repos/mafina/test/milestones{/number}","notifications_url":"https://api.github.com/repos/mafina/test/notifications{?since,all,participating}","labels_url":"https://api.github.com/repos/mafina/test/labels{/name}","releases_url":"https://api.github.com/repos/mafina/test/releases{/id}","deployments_url":"https://api.github.com/repos/mafina/test/deployments","created_at":"2016-08-09T16:16:42Z","updated_at":"2016-08-09T22:15:53Z","pushed_at":"2016-08-09T22:15:52Z","git_url":"git://github.com/mafina/test.git","ssh_url":"git@github.com:mafina/test.git","clone_url":"https://github.com/mafina/test.git","svn_url":"https://github.com/mafina/test","homepage":null,"size":2,"stargazers_count":0,"watchers_count":0,"language":"HTML","has_issues":true,"has_downloads":true,"has_wiki":true,"has_pages":false,"forks_count":0,"mirror_url":null,"open_issues_count":0,"forks":0,"open_issues":0,"watchers":0,"default_branch":"master"}]';

    beforeEach(module("webApp"));

    beforeEach(inject(function($controller, $rootScope, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        httpStatusCodes = $injector.get('httpStatusCodes');
        getReposForUserService = getReposForUserService;		

        $httpBackend.when('GET', 'https://api.github.com/users/mafina/repos').respond(demoResponseData);    
        $httpBackend.when('GET', 'https://api.github.com/users//repos').respond(404);

        controllerScope = $rootScope.$new();
        $controller('MainController', {
            $scope: controllerScope
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('getListOfRepos method should return and assign the result data fetched from the api to repoData variable', function() {
    	controllerScope.repoName.name = "mafina";
        controllerScope.getListOfRepos();
        $httpBackend.flush();   

        expect(controllerScope.repoData).toEqual(JSON.parse(demoResponseData));
    });

    it('error object should be assigned to err variable if the API responds with error status code 404', function() {
    	controllerScope.getListOfRepos();    	
    	$httpBackend.flush();
    	expect(controllerScope.err.statusText).toBe('Not Found!');
	});
});