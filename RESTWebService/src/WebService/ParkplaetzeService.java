package WebService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import entities.Parkplaetze;

@Path("ParkplaetzeService")
public class ParkplaetzeService {

	Connection connection;
	Statement statement;
	
	public ParkplaetzeService() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();	
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getParkplatz")
	public Parkplaetze getParkplatz(@QueryParam("oertlichkeitenId") String oertlichkeitenId){
		System.out.println("getParkplatz called...");
		Parkplaetze parkplatz = new Parkplaetze();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Parkplaetze "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Parkplaetze.oertlichkeitenId AND "
					+ "Oertlichkeiten.oertlichkeitenId = " + oertlichkeitenId);
			
			while(rs.next()){
				parkplatz.parkplaetzeId = rs.getInt("Parkplaetze.parkplaetzeId");
				parkplatz.oeffnungszeiten = rs.getString("Parkplaetze.oeffnungszeiten");
				parkplatz.kosten = rs.getString("Parkplaetze.kosten");
				parkplatz.beschreibung = rs.getString("Parkplaetze.beschreibung");
				parkplatz.oertlichkeitenId = rs.getInt("Parkplaetze.oertlichkeitenId");
				parkplatz.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				parkplatz.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				parkplatz.oertlichkeit.longitude = rs.getString("Oertlichkeiten.longitude");
				parkplatz.oertlichkeit.latitude = rs.getString("Oertlichkeiten.latitude");
				parkplatz.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				parkplatz.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				parkplatz.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				parkplatz.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				parkplatz.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			parkplatz = null;
		}
		return parkplatz;
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllParkplaetze")
	public List<Parkplaetze> getAllParkplaetze(){
		System.out.println("getAllParkplaetze called...");
		List<Parkplaetze> returnList = new ArrayList<Parkplaetze>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Parkplaetze "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Parkplaetze.oertlichkeitenId ");
			
			while(rs.next()){
				Parkplaetze parkplatz = new Parkplaetze();
				parkplatz.parkplaetzeId = rs.getInt("Parkplaetze.parkplaetzeId");
				parkplatz.oeffnungszeiten = rs.getString("Parkplaetze.oeffnungszeiten");
				parkplatz.kosten = rs.getString("Parkplaetze.kosten");
				parkplatz.beschreibung = rs.getString("Parkplaetze.beschreibung");
				parkplatz.oertlichkeitenId = rs.getInt("Parkplaetze.oertlichkeitenId");
				parkplatz.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				parkplatz.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				parkplatz.oertlichkeit.longitude = rs.getString("Oertlichkeiten.longitude");
				parkplatz.oertlichkeit.latitude = rs.getString("Oertlichkeiten.latitude");
				parkplatz.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				parkplatz.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				parkplatz.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				parkplatz.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				parkplatz.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
				returnList.add(parkplatz);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			returnList = null;
		}
		return returnList;
	}
	
	@PUT
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("addParkplatz")
	public Response addParkplatz(@QueryParam("bezeichnung") String bezeichnung, @QueryParam("longitude") String longitude, @QueryParam("latitude") String latitude,
			@QueryParam("strasse") String strasse, @QueryParam("hausnummer") String hausnummer, @QueryParam("plz") int plz,
			@QueryParam("ort") String ort, @QueryParam("kategorie") String Kategorie, @QueryParam("kosten") String kosten,
			@QueryParam("beschreibung") String beschreibung, @QueryParam("oeffnungszeiten") String oeffnungszeiten){
		System.out.println("ParkplaetzeService/addParkplatz... called.");
		try {
			boolean erfolgreich1 = statement.execute("INSERT INTO Oertlichkeiten (bezeichnung, longitude, latitude, strasse, hausnummer, postleitzahl, ort, kategorienId) "
					+ "VALUES ('" + bezeichnung + "', '" + longitude + "', '" + latitude + "', '" + strasse + "', "
					+ "'+" + hausnummer + "', " + plz + ", '" + ort + "', 1");
			
			ResultSet rs = statement.executeQuery("SELECT * FROM Oertlichkeiten"
					+ " WHERE longitude='" + longitude + "' AND latitude='" + latitude + " ");
			
			int oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
			
			boolean erfolgreich2 = statement.execute("INSERT INTO Parkplaetze (oeffnungszeiten, kosten, beschreibung, oertlichkeitenId) "
					+ "VALUES ('" + oeffnungszeiten + "', '" + kosten + "', '" + beschreibung + "', " + oertlichkeitenId + ") ");
		}
		catch(Exception e){
			System.out.println(e.toString());
			return Response.serverError().build();
		}
		return Response.ok().build();
	}

}
