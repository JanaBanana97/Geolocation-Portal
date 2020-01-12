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
	public Response getPolitik(@QueryParam("oertlichkeitenId") String oertlichkeitenId){
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
				politik.oertlichkeit.longitude = rs.getDouble("Oertlichkeiten.longitude");
				politik.oertlichkeit.latitude = rs.getDouble("Oertlichkeiten.latitude");
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
		GenericEntity<Politik> myEntity = new GenericEntity<Politik>(politik) {};
		return Response.ok(myEntity).build();
		//return politik;
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllPolitik")
	public Response getAllPolitik(){
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
				politik.oertlichkeit.longitude = rs.getDouble("Oertlichkeiten.longitude");
				politik.oertlichkeit.latitude = rs.getDouble("Oertlichkeiten.latitude");
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
		GenericEntity<List<Politik>> myEntity = new GenericEntity<List<Politik>>(returnList) {};
		return Response.ok(myEntity).build();
		//return returnList;
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("addPolitik")
	public Response addPolitik(Politik p){
		System.out.println("PolitikService/addPolitik... called.");
		try {
			if (p.oertlichkeit != null){
				String str = "INSERT INTO Oertlichkeiten (bezeichnung, longitude, latitude, strasse, hausnummer, postleitzahl, ort, kategorienId) "
						+ " VALUES(?,?,?,?,?,?,?,?)";
				PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
				st.setString(1, p.oertlichkeit.bezeichnung);
				st.setDouble(2, p.oertlichkeit.longitude);
				st.setDouble(3, p.oertlichkeit.longitude);
				st.setString(4, p.oertlichkeit.strasse);
				st.setString(5, p.oertlichkeit.hausnummer);
				st.setInt(6, p.oertlichkeit.postleitzahl);
				st.setString(7, p.oertlichkeit.ort);
				st.setInt(8, 4);
				st.execute();	
			}
						
			if (p != null) {
				ResultSet rs = statement.executeQuery("SELECT * FROM Oertlichkeiten"
						+ " WHERE longitude='" + p.oertlichkeit.longitude + "' AND latitude='" + p.oertlichkeit.latitude + " ");
				int oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				
				String str1 = "INSERT INTO Politik (typ, beschreibung, oertlichkeitenId) "
						+ " VALUES(?,?,?)";
				PreparedStatement st1 = connection.prepareStatement(str1, Statement.RETURN_GENERATED_KEYS);
				st1.setString(1, p.typ);
				st1.setString(2, p.beschreibung);
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
	@Path("updatePolitik")
	public Response updatePolitik(List<Politik> politik){
		System.out.println("PolitikService/updatePolitik... called.");
		try {	
			for(Politik p : politik){
				if (p.oertlichkeit != null) {
					String str = "UPDATE Oertlichkeiten "
							+ " SET bezeichnung = ?, longitude = ?, latitude = ?, strasse = ?, hausnummer = ?, postleitzahl = ?, ort = ?, kategorienId = ? "
							+ " WHERE oertlichkeitenId=" + p.oertlichkeit.oertlichkeitenId;
					PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
					st.setString(1, p.oertlichkeit.bezeichnung);
					st.setDouble(2, p.oertlichkeit.longitude);
					st.setDouble(3, p.oertlichkeit.longitude);
					st.setString(4, p.oertlichkeit.strasse);
					st.setString(5, p.oertlichkeit.hausnummer);
					st.setInt(6, p.oertlichkeit.postleitzahl);
					st.setString(7, p.oertlichkeit.ort);
					st.setInt(8, 4);
					st.execute();
						
				}
					
				if (p != null){
					String str1 = "UPDATE Politik "
							+ " SET typ = ?, beschreibung = ?, oertlichkeitenId = ? "
							+ " WHERE oertlichkeitenId=" + p.oertlichkeitenId;
					PreparedStatement st1 = connection.prepareStatement(str1, Statement.RETURN_GENERATED_KEYS);
					st1.setString(1, p.typ);
					st1.setString(2, p.beschreibung);
					st1.setInt(3, p.oertlichkeitenId);
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
