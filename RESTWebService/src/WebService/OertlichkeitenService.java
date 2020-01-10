package WebService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import entities.Oertlichkeiten;

@Path("OertlichkeitenService")
public class OertlichkeitenService {

	Connection connection;
	Statement statement;
	
	public OertlichkeitenService() throws SQLException, ClassNotFoundException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();	
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllOertlichkeiten")
	public Response getAllOertlichkeiten(){
		System.out.println("OertlichkeitenService.getAllOertlichkeiten... called.");
		List<Oertlichkeiten> returnList = new ArrayList<Oertlichkeiten>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten ");
			
			while(rs.next()){
				Oertlichkeiten o = new Oertlichkeiten();
				o.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				o.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				o.longitude = rs.getDouble("Oertlichkeiten.longitude");
				o.latitude = rs.getDouble("Oertlichkeiten.latitude");
				o.strasse = rs.getString("Oertlichkeiten.strasse");
				o.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				o.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				o.ort = rs.getString("Oertlichkeiten.ort");
				o.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
				returnList.add(o);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			returnList = null;
		}
		GenericEntity<List<Oertlichkeiten>> myEntity = new GenericEntity<List<Oertlichkeiten>>(returnList) {};
		return Response.ok(myEntity).build();
		//return returnList;
	}
	
	@GET
	@Consumes({MediaType.TEXT_PLAIN})
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getLocationByKategorie")
	public Response getLocationByKategorie(@QueryParam("kategorie") String kategorie){
		System.out.println("OertlichkeitenService.getLocationByKategorie... called.");
		List<Oertlichkeiten> returnList = new ArrayList<Oertlichkeiten>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Oertlichkeiten, Kategorien "
					+ "WHERE Oertlichkeiten.kategorienId = Kategorien.kategorienId AND "
					+ "Kategorien.bezeichnung = '" + kategorie + "' ");
			
			while(rs.next()){
				Oertlichkeiten o = new Oertlichkeiten();
				o.oertlichkeitenId = rs.getInt("Oertlichkeiten.oertlichkeitenId");
				o.bezeichnung = rs.getString("Oertlichkeiten.bezeichnung");
				o.longitude = rs.getDouble("Oertlichkeiten.longitude");
				o.latitude = rs.getDouble("Oertlichkeiten.latitude");
				o.strasse = rs.getString("Oertlichkeiten.strasse");
				o.hausnummer = rs.getString("Oertlichkeiten.hausnummer");
				o.postleitzahl = rs.getInt("Oertlichkeiten.postleitzahl");
				o.ort = rs.getString("Oertlichkeiten.ort");
				o.kategorienId = rs.getInt("Oertlichkeiten.kategorienId");
				returnList.add(o);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			returnList = null;
		}
		GenericEntity<List<Oertlichkeiten>> myEntity = new GenericEntity<List<Oertlichkeiten>>(returnList) {};
		return Response.ok(myEntity).build();
		//return returnList;
	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("addOertlichkeit")
	public Response addOertlichkeit(Oertlichkeiten oertlichkeit){
		System.out.println("OertlichkeitenService.addOertlichkeit... called.");
		try {
			String str = "INSERT INTO Oertlichkeiten (bezeichnung, longitude, latitude, strasse, hausnummer, postleitzahl, ort, kategorienId) "
					+ " VALUES(?,?,?,?,?,?,?,?)";
			PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
			st.setString(1, oertlichkeit.bezeichnung);
			st.setDouble(2, oertlichkeit.longitude);
			st.setDouble(3, oertlichkeit.longitude);
			st.setString(4, oertlichkeit.strasse);
			st.setString(5, oertlichkeit.hausnummer);
			st.setInt(6, oertlichkeit.postleitzahl);
			st.setString(7, oertlichkeit.ort);
			st.setInt(8, oertlichkeit.kategorienId);
			st.execute();
			
		}
		catch(Exception e){
			System.out.println(e.toString());
			oertlichkeit = null;
		}
		GenericEntity<Oertlichkeiten> myEntity = new GenericEntity<Oertlichkeiten>(oertlichkeit) {};
		return Response.ok(myEntity).build();
	}
		
}
