import Employees from './Employees'
import Home from './Home'
import Tables from './Tables'
import Players from './Players'
import Bets from './Bets'
import BetsTypes from './BetsTypes'
import Locations from './Locations'
import Games from './Games'


// export { Home }

const routes = [
    {
        path: '/',
        title: 'Home',
        component: Home
    },
    {
        path: '/tables',
        title: 'Tables',
        component: Tables
    },
    {
        path: '/employees',
        title: 'Employees',
        component: Employees
    },
    {
        path: '/players',
        title: 'Players',
        component: Players
    },
    {
        path: '/bets',
        title: 'Bets',
        component: Bets
    },
    {
        path: '/betsTypes',
        title: 'BetsTypes',
        component: BetsTypes
    },
    {
        path: '/locations',
        title: 'Locations',
        component: Locations
    },
    {
        path: '/games',
        title: 'Games',
        component: Games
    }
]

export default routes
