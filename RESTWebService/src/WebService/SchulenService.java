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

import entities.Schulen;

@Path("SchulenService")
public class SchulenService {

	Connection connection;
	Statement statement;
	
	public SchulenService() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");		
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();	
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getSchule")
	public Response getSchule (@QueryParam("oertlichkeitenId") String oertlichkeitenId){
		System.out.println("getSchule called...");
		Schulen schule = new Schulen();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Schulen "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Schulen.oertlichkeitenId AND "
					+ "Oertlichkeiten.oertlichkeitenId = " + oertlichkeitenId);
			
			while(rs.next()){
				schule.schulenId = rs.getInt("Schulen.schulenId");
				schule.typ = rs.getString("Schulen.typ");
				schule.beschreibung = rs.getString("Schulen.beschreibung");
				schule.oertlichkeitenId = rs.getInt("Schulen.oertlichkeitenId");
				schule.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				schule.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				schule.oertlichkeit.longitude = rs.getDouble("Oertlichkeiten.longitude");
				schule.oertlichkeit.latitude = rs.getDouble("Oertlichkeiten.latitude");
				schule.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				schule.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				schule.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				schule.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				schule.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			schule = null;
		}
		GenericEntity<Schulen> myEntity = new GenericEntity<Schulen>(schule){};
		return Response.ok(myEntity).build();
		//return schule;
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllSchulen")
	public Response getAllPolitik(){
		System.out.println("getAllSchulen called...");
		List<Schulen> returnList = new ArrayList<Schulen>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Schulen "
					+ "WHERE Oertlichkeiten.oertlichkeitenId = Schulen.oertlichkeitenId ");
			
			while(rs.next()){
				Schulen schulen = new Schulen();
				schulen.schulenId = rs.getInt("Schulen.schulenId");
				schulen.typ = rs.getString("Schulen.typ");
				schulen.beschreibung = rs.getString("Schulen.beschreibung");
				schulen.oertlichkeitenId = rs.getInt("Schulen.oertlichkeitenId");
				schulen.oertlichkeit.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				schulen.oertlichkeit.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				schulen.oertlichkeit.longitude = rs.getDouble("Oertlichkeiten.longitude");
				schulen.oertlichkeit.latitude = rs.getDouble("Oertlichkeiten.latitude");
				schulen.oertlichkeit.strasse = rs.getString("Oertlichkeiten.strasse");
				schulen.oertlichkeit.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				schulen.oertlichkeit.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				schulen.oertlichkeit.ort = rs.getString("Oertlichkeiten.ort");
				schulen.oertlichkeit.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
				returnList.add(schulen);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			returnList = null;
		}
		GenericEntity<List<Schulen>> myEntity = new GenericEntity<List<Schulen>>(returnList){};
		return Response.ok(myEntity).build();
		//return returnList;
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("addSchule")
	public Response addSchule(Schulen s){
		System.out.println("SchulenService/addSchule... called.");
		try {
			if (s.oertlichkeit != null){
				String str = "INSERT INTO Oertlichkeiten (bezeichnung, longitude, latitude, strasse, hausnummer, postleitzahl, ort, kategorienId) "
						+ " VALUES(?,?,?,?,?,?,?,?)";
				PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
				st.setString(1, s.oertlichkeit.bezeichnung);
				st.setDouble(2, s.oertlichkeit.longitude);
				st.setDouble(3, s.oertlichkeit.longitude);
				st.setString(4, s.oertlichkeit.strasse);
				st.setString(5, s.oertlichkeit.hausnummer);
				st.setInt(6, s.oertlichkeit.postleitzahl);
				st.setString(7, s.oertlichkeit.ort);
				st.setInt(8, s.oertlichkeit.kategorienId);
				st.execute();	
			}
			
			if (s != null) {
				ResultSet rs = statement.executeQuery("SELECT * FROM Oertlichkeiten"
						+ " WHERE longitude='" + s.oertlichkeit.longitude + "' AND latitude='" + s.oertlichkeit.latitude + " ");
				int oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				
				String str1 = "INSERT INTO Schulen (typ, beschreibung, oertlichkeitenId) "
						+ " VALUES(?,?,?)";
				PreparedStatement st1 = connection.prepareStatement(str1, Statement.RETURN_GENERATED_KEYS);
				st1.setString(1, s.typ);
				st1.setString(2, s.beschreibung);
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
	@Path("updateSchule")
	public Response updateSchulen(List<Schulen> schulen){
		System.out.println("SchulenService/updateSchulen... called.");
		try {	
			for(Schulen s : schulen){
				if (s.oertlichkeit != null) {
					String str = "UPDATE Oertlichkeiten "
							+ " SET bezeichnung = ?, longitude = ?, latitude = ?, strasse = ?, hausnummer = ?, postleitzahl = ?, ort = ?, kategorienId = ? "
							+ " WHERE oertlichkeitenId=" + s.oertlichkeit.oertlichkeitenId;
					PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
					st.setString(1, s.oertlichkeit.bezeichnung);
					st.setDouble(2, s.oertlichkeit.longitude);
					st.setDouble(3, s.oertlichkeit.longitude);
					st.setString(4, s.oertlichkeit.strasse);
					st.setString(5, s.oertlichkeit.hausnummer);
					st.setInt(6, s.oertlichkeit.postleitzahl);
					st.setString(7, s.oertlichkeit.ort);
					st.setInt(8, s.oertlichkeit.kategorienId);
					st.execute();	
				}
					
				if (s != null) {
					String str1 = "UPDATE Schulen "
							+ " SET typ = ?, beschreibung = ?, oertlichkeitenId = ? "
							+ " WHERE oertlichkeitenId=" + s.oertlichkeitenId;
					PreparedStatement st1 = connection.prepareStatement(str1, Statement.RETURN_GENERATED_KEYS);
					st1.setString(1, s.typ);
					st1.setString(2, s.beschreibung);
					st1.setInt(3, s.oertlichkeitenId);
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
