package WebService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
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
	public Response getParkplatz(@QueryParam("oertlichkeitenId") String oertlichkeitenId){
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
				parkplatz.oertlichkeit.longitude = rs.getDouble("Oertlichkeiten.longitude");
				parkplatz.oertlichkeit.latitude = rs.getDouble("Oertlichkeiten.latitude");
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
		GenericEntity<Parkplaetze> myEntity = new GenericEntity<Parkplaetze>(parkplatz) {};
		return Response.ok(myEntity).build();
		//return parkplatz;
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllParkplaetze")
	public Response getAllParkplaetze(){
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
				parkplatz.oertlichkeit.longitude = rs.getDouble("Oertlichkeiten.longitude");
				parkplatz.oertlichkeit.latitude = rs.getDouble("Oertlichkeiten.latitude");
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
		GenericEntity<List<Parkplaetze>> myEntity = new GenericEntity<List<Parkplaetze>>(returnList) {};
		return Response.ok(myEntity).build();
		//return returnList;
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("addParkplatz")
	public Response addParkplatz(Parkplaetze p){
		System.out.println("ParkplaetzeService/addParkplatz... called.");
		try {
			if (p.oertlichkeit != null) {
				String str = "INSERT INTO Oertlichkeiten (bezeichnung, longitude, latitude, strasse, hausnummer, postleitzahl, ort, kategorienId) "
						+ " VALUES(?,?,?,?,?,?,?,?)";
				PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
				st.setString(1, p.oertlichkeit.bezeichnung);
				st.setDouble(2, p.oertlichkeit.longitude);
				st.setDouble(3, p.oertlichkeit.latitude);
				st.setString(4, p.oertlichkeit.strasse);
				st.setString(5, p.oertlichkeit.hausnummer);
				st.setInt(6, p.oertlichkeit.postleitzahl);
				st.setString(7, p.oertlichkeit.ort);
				st.setInt(8, 1);
				st.execute();
				
			}
			
			if (p != null){
				ResultSet rs = statement.executeQuery("SELECT * FROM Oertlichkeiten"
						+ " WHERE longitude=" + p.oertlichkeit.longitude + " AND latitude=" + p.oertlichkeit.latitude + " ");
				int oertlichkeitenId = 0;
				while(rs.next()){
					oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");	
				}
				
				String str1 = "INSERT INTO Parkplaetze (oeffnungszeiten, kosten, beschreibung, oertlichkeitenId) "
						+ " VALUES(?,?,?,?)";
				PreparedStatement st1 = connection.prepareStatement(str1, Statement.RETURN_GENERATED_KEYS);
				st1.setString(1, p.oeffnungszeiten);
				st1.setString(2, p.kosten);
				st1.setString(3, p.beschreibung);
				st1.setInt(4, oertlichkeitenId);
				st1.execute();	
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			return Response.serverError().build();
		}
		return Response.ok().build();
	}
	
	
	@PUT
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("updateParkplatz")
	public Response updateSchulen(List<Parkplaetze> parkplaetze){
		System.out.println("ParkplaetzeService/updateParkplatz... called.");
		try {
			for(Parkplaetze p : parkplaetze){
				if (p.oertlichkeit != null){
					String str = "UPDATE Oertlichkeiten "
							+ " SET bezeichnung = ?, longitude = ?, latitude = ?, strasse = ?, hausnummer = ?, postleitzahl = ?, ort = ?, kategorienId = ? "
							+ " WHERE oertlichkeitenId=" + p.oertlichkeit.oertlichkeitenId;
					PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
					st.setString(1, p.oertlichkeit.bezeichnung);
					st.setDouble(2, p.oertlichkeit.longitude);
					st.setDouble(3, p.oertlichkeit.latitude);
					st.setString(4, p.oertlichkeit.strasse);
					st.setString(5, p.oertlichkeit.hausnummer);
					st.setInt(6, p.oertlichkeit.postleitzahl);
					st.setString(7, p.oertlichkeit.ort);
					st.setInt(8, 1);
					st.execute();	
				}
				
				if (p != null){
					String str1 = "UPDATE Parkplaetze "
							+ " SET oeffnungszeiten = ?, kosten = ?, beschreibung = ?, oertlichkeitenId = ? "
							+ " WHERE oertlichkeitenId=" + p.oertlichkeitenId;
					PreparedStatement st1 = connection.prepareStatement(str1, Statement.RETURN_GENERATED_KEYS);
					st1.setString(1, p.oeffnungszeiten);
					st1.setString(2, p.kosten);
					st1.setString(3, p.beschreibung);
					st1.setInt(4, p.oertlichkeitenId);
					st1.execute();
				}		
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			return Response.serverError().build();
		}
		
		return Response.ok().build();
	}

}
