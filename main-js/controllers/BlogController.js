

app.controller("BlogCtrl", function(PlayerService, $stateParams) {
	console.log($stateParams);
	var data = [
		{
			StreamUri: 'Tumi Je Amar By Somlata.mp3',
			Title: 'This is title'
		},
		{
			StreamUri: 'http://flatfull.com/themes/assets/musics/Miaow-07-Bubble.mp3',
			Title: 'This is title'
		}
	];
	PlayerService.Play(data);
	// PlayerService.Play('http://flatfull.com/themes/assets/musics/Miaow-07-Bubble.mp3');
});