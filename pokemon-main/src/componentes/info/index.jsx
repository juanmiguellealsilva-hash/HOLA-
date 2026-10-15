import { useState, useEffect } from 'react'

function Info() {
  const [listaPokemons, setListaPokemons] = useState([])
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
      .then(res => res.json())
      .then(data => setListaPokemons(data.results))
      .catch(err => console.error("Error al cargar lista:", err))
  }, [])

  const cargarInfoPokemon = (nombre) => {
    setCargando(true)
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
      .then(res => res.json())
      .then(data => {
        setPokemonSeleccionado(data)
        setCargando(false)
      })
      .catch(err => {
        console.error("Error al cargar detalle:", err)
        setCargando(false)
      })
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '30px auto',
      padding: '30px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f0f2f5',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h2 style={{ color: '#1a1a1a', margin: '0 0 8px 0', fontSize: '28px' }}>⚡ PokéAPI Explorer ⚡</h2>
        <p style={{ color: '#666', margin: 0 }}>Haz clic en un Pokémon para ver su tarjeta de información</p>
      </div>

      {/* Grid de botones / tarjetas de selección */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
        gap: '12px', 
        marginBottom: '30px' 
      }}>
        {listaPokemons.map((p) => (
          <button
            key={p.name}
            onClick={() => cargarInfoPokemon(p.name)}
            style={{
              padding: '12px 10px',
              cursor: 'pointer',
              textTransform: 'capitalize',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#ffffff',
              color: '#333',
              fontWeight: '600',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#ffcb05';
              e.currentTarget.style.color = '#2a75bb';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#333';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Estado de carga */}
      {cargando && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          <p>Cargando información del Pokémon...</p>
        </div>
      )}

      {/* Tarjeta de Detalle del Pokémon */}
      {pokemonSeleccionado && !cargando && (
        <div style={{ 
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          padding: '25px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative'
        }}>
          <span style={{
            position: 'absolute',
            top: '20px',
            right: '25px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#aaa'
          }}>
            #{pokemonSeleccionado.id}
          </span>

          <h1 style={{ textTransform: 'capitalize', color: '#333', margin: '0 0 15px 0' }}>
            {pokemonSeleccionado.name}
          </h1>
          
          <div style={{ backgroundColor: '#f8f9fa', borderRadius: '50%', padding: '10px', marginBottom: '15px' }}>
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonSeleccionado.id}.png`} 
              alt={pokemonSeleccionado.name} 
              width="160"
              style={{ display: 'block' }}
            />
          </div>

          {/* Tipos */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {pokemonSeleccionado.types.map(t => (
              <span key={t.type.name} style={{
                textTransform: 'capitalize',
                backgroundColor: '#2a75bb',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {t.type.name}
              </span>
            ))}
          </div>

          {/* Datos y Estadísticas en 2 columnas */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '20px', 
            width: '100%',
            borderTop: '1px solid #eee',
            paddingTop: '20px'
          }}>
            <div>
              <h4 style={{ color: '#555', margin: '0 0 10px 0' }}>Información</h4>
              <p style={{ margin: '6px 0' }}><strong>Altura:</strong> {pokemonSeleccionado.height / 10} m</p>
              <p style={{ margin: '6px 0' }}><strong>Peso:</strong> {pokemonSeleccionado.weight / 10} kg</p>
            </div>

            <div>
              <h4 style={{ color: '#555', margin: '0 0 10px 0' }}>Estadísticas</h4>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#444' }}>
                <li><strong>HP:</strong> {pokemonSeleccionado.stats[0].base_stat}</li>
                <li><strong>Atq:</strong> {pokemonSeleccionado.stats[1].base_stat}</li>
                <li><strong>Def:</strong> {pokemonSeleccionado.stats[2].base_stat}</li>
                <li><strong>Atq. Esp:</strong> {pokemonSeleccionado.stats[3].base_stat}</li>
                <li><strong>Def. Esp:</strong> {pokemonSeleccionado.stats[4].base_stat}</li>
                <li><strong>Vel:</strong> {pokemonSeleccionado.stats[5].base_stat}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Info