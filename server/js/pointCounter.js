module.exports = function pointCounter(deck) { 
    for (var i = deck.length - 1; i > 0; i--) {
        if (deck[i] == '3D' || deck[i] == '3S' || deck[i] == '3B' || deck[i] == '3C') {
            var point =+ 10
        } else if (deck[i] == '10D' || deck[i] == '10S' || deck[i] == '10B' || deck[i] == '10C') {
            var point =+ 11
        } else if (deck[i] == '12D' || deck[i] == '12S' || deck[i] == '12B' || deck[i] == '12C') {
            var point =+ 2
        } else if (deck[i] == '13D' || deck[i] == '13S' || deck[i] == '13B' || deck[i] == '13C') {
            var point =+ 3
        } else if (deck[i] == '14D' || deck[i] == '14S' || deck[i] == '14B' || deck[i] == '14C') {
            var point =+ 4
        }
    }   
    return point
}