new Vue({
    el: '#app',
    data: {
        initial: true,
        playerHealth: 100,
        monsterHealth: 100,
        logs: [],
        isGoing: false,
        winner: ''
    },
    methods: {
        start: function () {
            this.initial = false
            this.isGoing = true
            this.logs = []
            this.playerHealth = 100
            this.monsterHealth = 100
            this.winner = ''
        },
        attack: function () {
            this.attackHuman()
            this.attackMonster()
        },
        special: function () {
            this.attackHuman()
            this.specialAttack()
        },
        attackHuman() {
            let damage = this.calculate(3, 10)
            if (this.playerHealth - damage > 0) {
                this.playerHealth -= damage
                this.logs.unshift({
                    isPlayer: false,
                    msg: `monster hits player for ${damage}`
                })
            } else if (this.isGoing) {
                this.playerHealth = 0
                this.logs.unshift({
                    isPlayer: false,
                    msg: `monster hits player for ${damage}`
                })
                this.winner = 'Monster'
                this.restart()
            }
        },
        attackMonster() {
            let damage = this.calculate(3, 10)
            if (this.monsterHealth - damage > 0 && this.playerHealth < 100) {
                this.monsterHealth -= damage
                this.logs.unshift({
                    isPlayer: true,
                    msg: `player hits monster for ${damage}`
                })
            } else if (this.isGoing && this.playerHealth < 100) {
                this.monsterHealth = 0
                this.logs.unshift({
                    isPlayer: true,
                    msg: `player hits monster for ${damage}`
                })
                this.winner = 'You'
                this.restart()
            }
        },
        specialAttack() {
            let damage = this.calculate(8, 15)
            if (this.monsterHealth - damage > 0) {
                this.monsterHealth -= damage
                if(this.isGoing){
                    this.logs.unshift({
                        isPlayer: true,
                        msg: `player hits monster with special attack 3 for ${damage}`
                    })
                }
            } else if (this.isGoing) {
                this.monsterHealth = 0
                this.winner = 'You'
                if(this.isGoing){
                    this.logs.unshift({
                        isPlayer: true,
                        msg: `player hits monster with special attack 3 for ${damage}`
                    })
                }
                this.restart()
            }
        },
        heal() {
            if(this.playerHealth < 100) this.attackHuman()
            if (this.playerHealth < 100) {
                let healing = 10
                if (this.playerHealth + healing >= 100) {
                    this.logs.unshift({
                        isPlayer: true,
                        msg: `player healing himself fully recover`
                    })
                    this.playerHealth = 100
                } else if (this.playerHealth > 0 && this.playerHealth + healing < 100) {
                    this.logs.unshift({
                        isPlayer: true,
                        msg: `player healing himself for ${healing}`
                    })
                    this.playerHealth += healing
                }
            }
        },
        calculate (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        giveUp() {
            this.initial = true
        },
        newGame () {
            this.start()
        },
        continue() {
            this.isGoing = false
            this.initial = true
        },
        restart() {
            if (confirm(`${this.winner} win the game! Do you want to start new game?`)) {
                this.newGame()
            } else {
                this.continue()
            }
        }
    }
})