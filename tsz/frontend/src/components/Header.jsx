import React from 'react'
//       A
//       I
//there is a red fucker up here

const Header = ({stats}) => {

    const szazalek = stats.total > 0 ?
    Math.round((stats.DONE / stats.total)*100) : 0;

  return (
    <header>
        <div>
            <h1>Kanban</h1>
            <p>Elkészültség: {szazalek}%</p>
        </div>
        <div>
            <span>Összesen: {stats.total}</span>
            <br />
            <span>Folyamatban: {stats.IN_PROGRESS}</span>
            <br />
            <span>Kész: {stats.DONE}</span>
            <br />
            <span>Backlog: {stats.TODO}</span>
        </div>
    </header>
  )
}

export default Header
