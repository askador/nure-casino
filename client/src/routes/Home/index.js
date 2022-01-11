import './index.scss'
import homeImage from '../../imgs/casino-home.jpg'

const buttons = [
  {
    path: '/tables',
    label: 'Столы'
  },
  {
    path: '/employees',
    label: 'Сотрудники'
  },
  {
    path: '/players',
    label: 'Игроки'
  },
  {
    path: '/bets',
    label: 'Ставки'
  },
  {
    path: '/betsTypes',
    label: 'Типы ставок',
  },
  {
    path: '/locations',
    label: 'Локации',
  },
  {
    path: '/games',
    label: 'Игры',
  }
]


const Home = () => {
  return (
    <div className='home'>
      <h2>NureCasino by Fedosov</h2>
      <img src={homeImage} alt='' />
      <div className='buttons-panel'>
        {buttons.map(({ path, label }, index) =>
          <a className='link_btn' href={path} key={index}>{label}</a>
        )}

      </div>
    </div>
  )
}

export default Home


