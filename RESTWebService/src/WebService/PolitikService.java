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

import entities.Politik;

@Path("PolitikService")
public class PolitikService {

	Connection connection;
	Statement statement;
	
	public PolitikService() throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");		
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();	
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getPolitik")
	public Politik getPolitik(@QueryParam("oertlichkeitenId") String oertlichkeitenId){
		System.out.println("getPolitik called...");
		Politik politik = new Politik();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Politik "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Politik.oertlichkeitenId AND "
					+ "Oertlichkeiten.oertlichkeitenId = " + oertlichkeitenId);
			
			while(rs.next()){
				politik.politikId = rs.getInt("Politik.politikId");
				politik.typ = rs.getString("Politik.typ");
				politik.beschreibung = rs.getString("Politik.beschreibung");
				politik.oertlichkeitenId = rs.getInt("Politik.oertlichkeitenId");
				politik.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				politik.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				politik.oertlichkeit.longitude = rs.getString("Oertlichkeiten.longitude");
				politik.oertlichkeit.latitude = rs.getString("Oertlichkeiten.latitude");
				politik.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				politik.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				politik.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				politik.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				politik.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			politik = null;
		}
		return politik;
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllPolitik")
	public List<Politik> getAllPolitik(){
		System.out.println("getAllPolitik called...");
		List<Politik> returnList = new ArrayList<Politik>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Politik "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Politik.oertlichkeitenId ");
			
			while(rs.next()){
				Politik politik = new Politik();
				politik.politikId = rs.getInt("Politik.politikId");
				politik.typ = rs.getString("Politik.typ");
				politik.beschreibung = rs.getString("Politik.beschreibung");
				politik.oertlichkeitenId = rs.getInt("Politik.oertlichkeitenId");
				politik.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				politik.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				politik.oertlichkeit.longitude = rs.getString("Oertlichkeiten.longitude");
				politik.oertlichkeit.latitude = rs.getString("Oertlichkeiten.latitude");
				politik.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				politik.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				politik.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				politik.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				politik.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
				returnList.add(politik);
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
	@Path("addPolitik")
	public Response addPolitik(@QueryParam("bezeichnung") String bezeichnung, @QueryParam("longitude") String longitude, @QueryParam("latitude") String latitude,
			@QueryParam("strasse") String strasse, @QueryParam("hausnummer") String hausnummer, @QueryParam("plz") int plz,
			@QueryParam("ort") String ort, @QueryParam("kategorie") String Kategorie, @QueryParam("typ") String typ,
			@QueryParam("beschreibung") String beschreibung){
		System.out.println("PolitikService/addPolitik... called.");
		try {
			boolean erfolgreich1 = statement.execute("INSERT INTO Oertlichkeiten (bezeichnung, longitude, latitude, strasse, hausnummer, postleitzahl, ort, kategorienId) "
					+ "VALUES ('" + bezeichnung + "', '" + longitude + "', '" + latitude + "', '" + strasse + "', "
					+ "'+" + hausnummer + "', " + plz + ", '" + ort + "', 4");
			
			ResultSet rs = statement.executeQuery("SELECT * FROM Oertlichkeiten"
					+ " WHERE longitude='" + longitude + "' AND latitude='" + latitude + " ");
			
			int oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
			
			boolean erfolgreich2 = statement.execute("INSERT INTO Politik (typ, beschreibung, oertlichkeitenId) "
					+ "VALUES ('" + typ + "', '" + beschreibung + "', " + oertlichkeitenId + ") ");
		}
		catch(Exception e){
			System.out.println(e.toString());
			return Response.serverError().build();
		}
		return Response.ok().build();
	}

}
