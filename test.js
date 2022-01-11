const a = ({id, bet}) => {
    console.log(id, bet)
}

const main = () => {
    let id = 1
    let bet = 2
    a({id, bet})
}
main()