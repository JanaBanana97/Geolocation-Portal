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

import entities.Gesundheit;

@Path("GesundheitService")
public class GesundheitService {

	Connection connection;
	Statement statement;
	
	public GesundheitService() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");		
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();	
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getGesundheit")
	public Response getGesundheit(@QueryParam("oertlichkeitenId") String oertlichkeitenId){
		System.out.println("getGesundheit called...");
		Gesundheit gesundheit = new Gesundheit();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Gesundheit "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Gesundheit.oertlichkeitenId AND "
					+ "Oertlichkeiten.oertlichkeitenId = " + oertlichkeitenId);
			
			while(rs.next()){
				gesundheit.gesundheitId = rs.getInt("Gesundheit.gesundheitId");
				gesundheit.typ = rs.getString("Gesundheit.typ");
				gesundheit.beschreibung = rs.getString("Gesundheit.beschreibung");
				gesundheit.oertlichkeitenId = rs.getInt("Gesundheit.oertlichkeitenId");
				gesundheit.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				gesundheit.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				gesundheit.oertlichkeit.longitude = rs.getDouble("Oertlichkeiten.longitude");
				gesundheit.oertlichkeit.latitude = rs.getDouble("Oertlichkeiten.latitude");
				gesundheit.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				gesundheit.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				gesundheit.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				gesundheit.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				gesundheit.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			gesundheit = null;
		}
		//return gesundheit;
		GenericEntity<Gesundheit> myEntity = new GenericEntity<Gesundheit>(gesundheit) {};
		return Response.ok(myEntity).build();
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllGesundheit")
	public Response getAllGesundheit(){
		System.out.println("getAllGesundheit called...");
		List<Gesundheit> returnList = new ArrayList<Gesundheit>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Gesundheit "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Gesundheit.oertlichkeitenId ");
			
			while(rs.next()){
				Gesundheit gesundheit = new Gesundheit();
				gesundheit.gesundheitId = rs.getInt("Gesundheit.gesundheitId");
				gesundheit.typ = rs.getString("Gesundheit.typ");
				gesundheit.beschreibung = rs.getString("Gesundheit.beschreibung");
				gesundheit.oertlichkeitenId = rs.getInt("Gesundheit.oertlichkeitenId");
				gesundheit.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				gesundheit.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				gesundheit.oertlichkeit.longitude = rs.getDouble("Oertlichkeiten.longitude");
				gesundheit.oertlichkeit.latitude = rs.getDouble("Oertlichkeiten.latitude");
				gesundheit.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				gesundheit.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				gesundheit.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				gesundheit.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				gesundheit.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
				returnList.add(gesundheit);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			returnList = null;
		}
		GenericEntity<List<Gesundheit>> myEntity = new GenericEntity<List<Gesundheit>>(returnList) {};
		return Response.ok(myEntity).build();
		//return returnList;
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("addGesundheit")
	public Response addGesundheit(Gesundheit g){
		System.out.println("GesundheitService/addGesundheit... called.");
		try {		
			if (g.oertlichkeit != null) {
				String str = "INSERT INTO Oertlichkeiten (bezeichnung, longitude, latitude, strasse, hausnummer, postleitzahl, ort, kategorienId) "
						+ " VALUES(?,?,?,?,?,?,?,?)";
				PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
				st.setString(1, g.oertlichkeit.bezeichnung);
				st.setDouble(2, g.oertlichkeit.longitude);
				st.setDouble(3, g.oertlichkeit.latitude);
				st.setString(4, g.oertlichkeit.strasse);
				st.setString(5, g.oertlichkeit.hausnummer);
				st.setInt(6, g.oertlichkeit.postleitzahl);
				st.setString(7, g.oertlichkeit.ort);
				st.setInt(8, 3);
				st.execute();	
			}
			
			if (g != null) {
				ResultSet rs = statement.executeQuery("SELECT * FROM Oertlichkeiten"
						+ " WHERE longitude=" + g.oertlichkeit.longitude + " AND latitude=" + g.oertlichkeit.latitude + " ");
				int oertlichkeitenId = 0;
				while(rs.next()){
					oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");	
				}
				
				String str1 = "INSERT INTO Gesundheit (typ, beschreibung, oertlichkeitenId) "
						+ " VALUES(?,?,?)";
				PreparedStatement st1 = connection.prepareStatement(str1, Statement.RETURN_GENERATED_KEYS);
				st1.setString(1, g.typ);
				st1.setString(2, g.beschreibung);
				st1.setInt(3, oertlichkeitenId);
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
	@Path("updateGesundheit")
	public Response updateGesundheit(List<Gesundheit> gesundheit){
		System.out.println("GesundheitService/updateGesundheit... called.");
		try {
			for(Gesundheit g : gesundheit){
				if (g.oertlichkeit != null) {
					String str = "UPDATE Oertlichkeiten "
							+ " SET bezeichnung = ?, longitude = ?, latitude = ?, strasse = ?, hausnummer = ?, postleitzahl = ?, ort = ?, kategorienId = ? "
							+ " WHERE oertlichkeitenId=" + g.oertlichkeit.oertlichkeitenId;
					PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
					st.setString(1, g.oertlichkeit.bezeichnung);
					st.setDouble(2, g.oertlichkeit.longitude);
					st.setDouble(3, g.oertlichkeit.latitude);
					st.setString(4, g.oertlichkeit.strasse);
					st.setString(5, g.oertlichkeit.hausnummer);
					st.setInt(6, g.oertlichkeit.postleitzahl);
					st.setString(7, g.oertlichkeit.ort);
					st.setInt(8, 3);
					st.execute();	
				}
				
				if (g != null) {
					String str1 = "UPDATE Gesundheit "
							+ " SET typ = ?, beschreibung = ?, oertlichkeitenId = ? "
							+ " WHERE oertlichkeitenId=" + g.oertlichkeitenId;
					PreparedStatement st1 = connection.prepareStatement(str1, Statement.RETURN_GENERATED_KEYS);
					st1.setString(1, g.typ);
					st1.setString(2, g.beschreibung);
					st1.setInt(3, g.oertlichkeitenId);
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
