const getRound = (card1, card2, briscola) => {

    function getScore(card) {
        const numberRegex = /^\d+/
        const match = card.match(numberRegex)
        var number = parseInt(match[0])

        if (number == 3) {
            return 19
        } else if (number == 10) {
            return 20
        } else {
            return number
        }
    }

    function getHigher(card1, card2, briscola) {

        var point1 = getScore(card1)
        var point2 = getScore(card2)

        if (card1.charAt(str.length - 1) == briscola && card2.charAt(str.length - 1) == briscola) {

            if (point1 > point2) {
                return 1
            } else {
                return 2
            }

        } else if (card1.charAt(str.length - 1) == briscola && card2.charAt(str.length - 1) != briscola) {

            return 1
    
        } else if (card1.charAt(str.length - 1)!== briscola && card2.charAt(str.length - 1) == briscola) {

            return 2
    
        } else if (card1.charAt(str.length - 1) == card2.charAt(str.length - 1)) {

            if (point1 > point2) {
                return 1
            } else {
                return 2
            }

        } else {
            return 1
        }
        
    }

    return getHigher(card1, card2, briscola)
}


module.exports = getRound