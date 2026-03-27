import { NextResponse } from "next/server";

export const revalidate = 0; // Evita que se cachee esta ruta de forma permanente

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return NextResponse.json({ error: "Faltan credenciales de Last.fm" }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener datos de Last.fm");
    }

    const data = await response.json();
    const tracks = data.recenttracks.track;

    if (!tracks || tracks.length === 0) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = tracks[0];
    
    // 1. Verificamos el flag oficial de Last.fm
    let isPlaying = track["@attr"]?.nowplaying === "true";
    
    // 2. Lógica inteligente de respaldo:
    // Si Last.fm no dice "now playing", pero la canción se registró hace muy poco (ej. menos de 5 minutos),
    // asumimos que sigue activo/escuchando música en su sesión actual.
    if (!isPlaying && track.date?.uts) {
      const scrobbleTime = parseInt(track.date.uts) * 1000; // Convertir a milisegundos
      const currentTime = Date.now();
      const differenceInMinutes = (currentTime - scrobbleTime) / (1000 * 60);
      
      // Si escuchó una canción hace menos de 6 minutos, mostramos la animación de "En Vivo"
      if (differenceInMinutes < 6) {
        isPlaying = true;
      }
    }
    
    // Las imágenes vienen en un array por tamaños
    const image = track.image[track.image.length - 1]["#text"] || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&auto=format&fit=crop";

    return NextResponse.json({
      title: track.name,
      artist: track.artist["#text"],
      album: track.album["#text"],
      url: track.url,
      image,
      isPlaying,
    });
  } catch (error) {
    console.error("Error Now Playing:", error);
    return NextResponse.json(
      { error: "Error al cargar la canción actual" },
      { status: 500 }
    );
  }
}
