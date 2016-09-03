
var Todo = angular.module("myTodo",[]);

	Todo.controller("MainController",["$scope","$filter",function($scope,$filter){



		//書いたやつを保存する
		$scope.todos=[];
		$scope.newTitle = "";


		//書いたやつを保存してダーンかどうかあげる
		$scope.addTodo = function(){
			$scope.todos.push({
				title : $scope.newTitle,
				done : false
			});
			$scope.newTitle = "";
		};


		//フィルターをかけて分類分けする
		$scope.filter = {
			done : {done : true},
			remaining : {done : false}
		};

		$scope.changeFilter = function(filter){
			$scope.currentFilter = filter;
		};


		//未完、完了の数を監視する
		var where = $filter("filter");
		$scope.$watch("todos",function(todos){
			var length = todos.length;

			$scope.allCount = length;
			$scope.doneCount = where(todos,$scope.filter.remaining).length;
			$scope.remainingCount = length - $scope.doneCount;
		},true);


		//編集モードの仕様実装
		var originalTitle;
		$scope.editing = null;

		$scope.editTodo = function(todo){
			originalTitle = todo.title;
			$scope.editing = todo;
		};


		//編集の確定
		$scope.doneEdit = function(){
			$scope.editing = null;
		};

	}])

//ディレクティブの作成
	.directive("mySelect",[function(){
		return function($scope,$el,attrs){
			$scope.$watch(attrs.mySelect,function(val){
				if(val){
					$el[0].select();
				}
			});
		};
	}]);







