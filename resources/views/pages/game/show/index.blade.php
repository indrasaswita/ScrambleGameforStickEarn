@extends('layouts.container')
@section('title', 'Scramble Game')
@section('description', 'Playing Game is Fun.')
@section('robots', 'noindex,nofollow')
@section('content')

<div class="gameshow-page" ng-controller="GameshowController">

@if(isset($letters) && isset($stored))
	@if($letters != null && $stored != null)

		<?php
			$temp = str_replace(array('\r', '\"', '\n', '\''), '?', $letters);
			$temp2 = str_replace(array('\r', '\"', '\n', '\''), '?', $stored);
		?>
		<div ng-init="initData('{{$temp}}', '{{$temp2}}')" hidden></div>
	@endif
@endif

	<div class="modal fade" id="check-modalresult" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-sm" role="document">
			<div class="modal-content">
				<div class="modal-body">
					<div class="list" ng-class="{'success':item.found}" ng-repeat="item in resultwords">
						<div class="word">[[item.word]]</div>
						<div class="icon">
							<i class="far fa-check" ng-if="item.found"></i>
							<i class="far fa-times" ng-if="!item.found"></i>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-sm" data-dismiss="modal">
						OK
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="wrapper">
		<div class="board-wrapper">
			<div class="board">
				<div class="row" ng-repeat="yy in boardimage">
					<div class="cell" 
						ng-class="{'blank':xx==0, 'dl':xx==1, 'tl':xx==2, 'dw':xx==3, 'tw':xx==4, 'king':xx==5}" 
						ng-repeat="xx in yy track by $index" 
						ng-init="parent = $parent.$index"
						ng-click="tileClick(parent, $index)"
					>
						<div class="inner" ng-if="!isFilled(parent, $index) && !isNewFilled(parent, $index)">
							<i class="fas fa-fw fa-crown" ng-if="xx==5"></i>
							[[xx==4?"TW":xx==3?"DW":xx==2?"TL":xx==1?"DL":""]]
						</div>
						<div class="inner filled" ng-if="isFilled(parent, $index)">
							<span class="num">
								[[getLetter(parent, $index)]]
							</span>
							<div class="lastletter value" ng-if="parent==lastY && $index==lastX">
								[[totalvalue]]
							</div>
						</div>
						<div class="inner filled input" ng-if="isNewFilled(parent, $index) && !isFilled(parent, $index)">
							<span class="num">
								[[getNewLetter(parent, $index)]] <!-- [[(boardinput[parent][$index].value)]] -->
							</span>
							<div class="lastletter value" ng-if="parent==lastY && $index==lastX">
								[[totalvalue]]
							</div>
						</div>
						<div class="fog" ng-hide="isNewFilled(parent, $index)" hidden>
						</div>
						<div class="highlight" ng-show="isNewEnable(parent, $index)">
						</div>
					</div>
				</div>
			</div>
			<div class="cue-wrapper">
				<div class="cue">
					<div class="cue-inner">
						<div class="cue-list" 
							ng-repeat="l in letters" 
							ng-click="selectALetter(l)"
							ng-class="{'selected':l.selected}"
						>
							<span class="text">
								[[(l.letter)]]
							</span>
							<span class="num" ng-if="l.value!=0">
								[[(l.value)]]
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="action-wrapper">
				<div class="action">
					<div class="action-inner">
						<button class="btn">
							<div class="icon">
								<i class="fas fa-step-forward fa-2x fa-fw"></i>
							</div>
							<div class="text">
								Pass
							</div>
						</button>
						<button class="btn">
							<div class="icon">
								<i class="fas fa-retweet fa-2x fa-fw"></i>
							</div>
							<div class="text">
								Shuffle
							</div>
						</button>
						<button class="btn" ng-click="postcheck()">
							<div class="icon">
								<i class="fas fa-save fa-2x fa-fw"></i>
							</div>
							<div class="text">
								Check!
							</div>
						</button>
					</div>
				</div>
			</div>
			<div class="store-wrapper">
				<div class="store-inner">
					<div class="store-title">
						Stockpile
					</div>
					<div class="store">
						<div class="store-list" ng-repeat="store in stored2">
							<div class="letter">
								[[(store.letter==" "?"-":store.letter)]]
							</div>
							<div class="num">
								[[store.total]]
							</div>
						</div>
					</div>
					<div class="store-end">
						Total Letters Left: [[stored.length]] 
					</div>
				</div>
			</div>
		</div>


	</div>
</div>

@stop
