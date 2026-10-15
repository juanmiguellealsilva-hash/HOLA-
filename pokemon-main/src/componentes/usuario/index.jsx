import { useState } from 'react'

function Usuario() {
  const [usuario, setUsuario] = useState('Entrenador')
  const [pokemonAleatorio, setPokemonAleatorio] = useState(null)
  const [cargando, setCargando] = useState(false)

  const obtenerPokemonAleatorio = () => {
    setCargando(true)
    const id = Math.floor(Math.random() * 1025) + 1
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => {
        setPokemonAleatorio(data)
        setCargando(false)
      })
      .catch(err => {
        console.error("Error:", err)
        setCargando(false)
      })
  }

  return (
    <div style={{ 
      maxWidth: '500px',
      margin: '30px auto',
      padding: '30px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      border: '2px solid #e1e4e8'
    }}>
      {/* Cabecera */}
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h1 style={{ color: '#2a75bb', margin: '0 0 5px 0', fontSize: '26px' }}>🏆 Carnet de Entrenador 🏆</h1>
        <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Personaliza tu perfil y descubre tu compañero Pokémon</p>
      </div>

      {/* Input de Nombre */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '14px' }}>
          Nombre de Entrenador:
        </label>
        <input 
          type="text" 
          value={usuario} 
          onChange={(e) => setUsuario(e.target.value)} 
          placeholder="Escribe tu nombre..."
          style={{
            width: '100%',
            padding: '12px 15px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = '#2a75bb'}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
        />
      </div>

      {/* Botón de Generar */}
      <button 
        onClick={obtenerPokemonAleatorio}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#ffcb05',
          color: '#2a75bb',
          fontWeight: 'bold',
          fontSize: '16px',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(255, 203, 5, 0.3)',
          transition: 'all 0.2s ease',
          marginBottom: '20px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#ffdb3a';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#ffcb05';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        ✨ Generar mi Pokémon Inicial ✨
      </button>

      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '25px 0' }} />

      {/* Saludo personalizado */}
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h2 style={{ color: '#333', margin: '0', fontSize: '22px' }}>
          ¡Hola, <span style={{ color: '#2a75bb' }}>{usuario || 'Entrenador'}</span>! 👋
        </h2>
      </div>

      {/* Estado de carga */}
      {cargando && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          <p>Buscando en la hierba alta (PokéAPI)...</p>
        </div>
      )}

      {/* Tarjeta del Pokémon Asignado */}
      {pokemonAleatorio && !cargando && (
        <div style={{ 
          backgroundColor: '#f8f9fa',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center',
          border: '1px solid #e9ecef',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <span style={{
            position: 'absolute',
            top: '12px',
            right: '15px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#888'
          }}>
            #{pokemonAleatorio.id}
          </span>

          <h3 style={{ margin: '0 0 10px 0', color: '#444', fontSize: '16px' }}>
            ¡Tu Pokémon compañero es:
          </h3>

          <div style={{ display: 'inline-block', backgroundColor: '#fff', borderRadius: '50%', padding: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '10px' }}>
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonAleatorio.id}.png`} 
              alt={pokemonAleatorio.name} 
              width="140"
              style={{ display: 'block' }}
            />
          </div>

          <h2 style={{ textTransform: 'capitalize', color: '#222', margin: '5px 0 10px 0', fontSize: '24px' }}>
            {pokemonAleatorio.name}
          </h2>

          <div style={{ display: 'inline-block', textTransform: 'capitalize', backgroundColor: '#2a75bb', color: '#fff', padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
            {pokemonAleatorio.types[0].type.name}
          </div>
        </div>
      )}
    </div>
  )
}

export default Usuario