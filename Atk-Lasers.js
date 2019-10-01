attemptMove = function(xdest, ydest) {
    if ( canMoveTo( xdest, ydest ) ) {
        moveTo( xdest, ydest );
    }
};

attemptLasers = function(target) {
    if( exists(target) && willLasersHit(target)){
        fireLasers(target);
    }
};

unit = function(n) {
    if( n >= 0 ){
        return 1;
    }
    return -1;
}

update = function () {
    closestEnemyBot = findClosestEnemyBot();
    if (getDistanceTo(closestEnemyBot) < 2) {
        dx = closestEnemyBot.x - x;
        dy = closestEnemyBot.y - y;
        if (abs(dy) > abs(dx)){
            attemptMove(x, y - unit(dy));
        }
        attemptMove(x - unit(dx), y);
        move();
    }
    lowestLifeEnemyBot = findEntity(ENEMY, BOT, SORT_BY_LIFE, SORT_ASCENDING);
    debugLog(lowestLifeEnemyBot);
    attemptLasers(enemyBotLowestLife);
    attemptLasers(closestEnemyBot);
    
    if (exists(lowestLifeEnemyBot)) {
        dx = lowestLifeEnemyBot.x - x;
        dy = lowestLifeEnemyBot.y - y;
        if (abs(dx) === 1 && abs(dy) === 1){ // Move away
        	if (dx < 0) {
                attemptMove(x + 1, y);
            }
            attemptMove(x - 1, y);
            if (dy < 0) {
                attemptMove(x, y + 1);
            }
            attemptMove(x, y - 1);
            move();
        }
        if (abs(dx) < abs(dy)) { // Move to line up a shot with lasers
            if (dx < 0) {
                attemptMove(x - 1, y);
            }
            attemptMove(x + 1, y);
        }
        if (dy < 0){
            attemptMove(x, y - 1);
        }
        attemptMove(x, y + 1);
    }
    figureItOut();
};

