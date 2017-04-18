'use strict';

var app = angular.module('hangman', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('start', {
				url: '/start',
				templateUrl: '/start.html',
				controller: 'StartCtrl'
			})
			.state('game', {
				url: '/game',
				templateUrl: '/game.html',
				controller: 'GameCtrl'
			})
			.state('lose', {
				url: '/lose/{word}',
				templateUrl: '/lose.html',
				controller: 'EndGameCtrl'
			})
			.state('win', {
				url: '/win/{word}',
				templateUrl: '/win.html',
				controller: 'EndGameCtrl'
			});

		$urlRouterProvider.otherwise('start');
}])

app.factory('alphabet', [ function () {
	return [{letter: "A", checked: false}, 
			{letter: "B", checked: false},
			{letter: "C", checked: false},
			{letter: "D", checked: false},
			{letter: "E", checked: false},
			{letter: "F", checked: false},
			{letter: "G", checked: false},
			{letter: "H", checked: false},
			{letter: "I", checked: false},
			{letter: "J", checked: false},
			{letter: "K", checked: false},
			{letter: "L", checked: false},
			{letter: "M", checked: false},
			{letter: "N", checked: false},
			{letter: "O", checked: false},
			{letter: "P", checked: false},
			{letter: "Q", checked: false},
			{letter: "R", checked: false},
			{letter: "S", checked: false},
			{letter: "T", checked: false},
			{letter: "U", checked: false},
			{letter: "V", checked: false},
			{letter: "W", checked: false},
			{letter: "X", checked: false},
			{letter: "Y", checked: false},
			{letter: "Z", checked: false}];
}]);
app.controller('GameCtrl', ['$scope', '$location', 'alphabet', function ($scope, $location, alphabet) {
		$scope.Alphabet = alphabet;			
		$scope.word = getNewWord();	
		$scope.guessLeft = 7;
		
		$scope.select = function(letter){
			//Make sure we haven't looked for this letter
			if(!letter.checked){
				//see if the letter is in the word we are looking for
				if(search(letter.letter, $scope.word) === -1){
					//nope minus 1 guess
					$scope.guessLeft = $scope.guessLeft - 1;
				}
				//we check this letter now
				letter.checked = true;
				
				//are we done looking for this word?
				var done = true;
				for (var i=0; i < $scope.word.length; i++) {
				    if($scope.word[i].found === false){
						done = false;
					}
				}
				//End Game Winning
				if(done){
					var word = '';
					for(var i = 0; i < $scope.word.length; i++){
						word = word + $scope.word[i].let;
					}
					$location.path('/win/' + word);
					
					$scope.reset();
				}
				//End Game Loosing
				if($scope.guessLeft == 0){
					var word = '';
					for(var i = 0; i < $scope.word.length; i++){
						word = word + $scope.word[i].let;
					}
					$location.path('/lose/' + word);
					
					$scope.reset();
				}
			}						
		}
		
		$scope.reset = function(){
			for(var i = 0; i < $scope.Alphabet.length; i++){
				$scope.Alphabet[i].checked = false;
			}
			$scope.guessLeft = 7;
			$scope.word = getNewWord();
		}
		
		function search(nameKey, myArray){
			var found = -1;
			for (var i=0; i < myArray.length; i++) {
				if (myArray[i].let === nameKey) {
					found = 1;
					myArray[i].found = true;
				}
			}
			return found;
		}
		
		function getNewWord(){
			var newWord = list[Math.floor(Math.random() * list.length)];
			var wordArray = [];
			for(var i = 0; i < newWord.length; i++){
				wordArray.push({id: i, let: newWord[i], found: false});
			}
			return wordArray;	
		}
	}
]);
app.controller('EndGameCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
	$scope.word = $stateParams.word;
}]);
app.controller('StartCtrl', ['$scope', function ($scope) {

}]);
