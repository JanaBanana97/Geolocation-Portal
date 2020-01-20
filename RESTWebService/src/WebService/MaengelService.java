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
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import entities.Maengel;

@Path("MaengelService")
public class MaengelService {

	Connection connection;
	Statement statement;
	
	public MaengelService() throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test?serverTimezone=UTC", "root", "");		
		//connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195",	"sql7314195", "nriJqjZlcz");
		statement = connection.createStatement();
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("getAllMaengel")
	public Response getAllMaengel (){
		System.out.println("getAllMaengel called...");
		List<Maengel> returnList = new ArrayList<Maengel>();
		try {
			ResultSet rs = statement.executeQuery(
					"SELECT * "
					+ "FROM Maengel ");
			
			while(rs.next()){
				Maengel mangel = new Maengel();
				mangel.maengelID = rs.getInt("Maengel.maengelId");
				mangel.beschreibung = rs.getString("Maengel.beschreibung");
				mangel.latitude = rs.getDouble("Maengel.latitude");
				mangel.longitude = rs.getDouble("Maengel.longitude");
				mangel.status = rs.getString("Maengel.status");
				//System.out.println("---" + rs.getBlob("Maengel.bild"));
				//mangel.bild = rs.getString("maengel.bild");
				returnList.add(mangel);
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			returnList = null;
		}
		GenericEntity<List<Maengel>> myEntitiy = new GenericEntity<List<Maengel>>(returnList) {};
		return Response.ok(myEntitiy).build();
		//return returnList;
	}
	
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("addMangel")
	public Response addMangel (Maengel mangel){
		System.out.println("addMangel called...");		
		try {			
			String str = "INSERT INTO Maengel (longitude, latitude, beschreibung, status) "
					+ " VALUES(?,?,?,?) ";
			
			System.out.println(mangel.longitude);
			System.out.println(mangel.latitude);
			System.out.println(mangel.beschreibung);
			System.out.println(mangel.status);
			
			PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
			st.setDouble(1, mangel.longitude);
			st.setDouble(2, mangel.latitude);
			st.setString(3, mangel.beschreibung);
			st.setString(4, "offen");
//			if (mangel.bild != null){
//				st.setBlob(5, uploadedInputStream);
//				st.setBlob(5, mangel.bild);
//			}
			//System.out.println("Blob: " + mangel.bild);
//			System.out.println("Inp: " + mangel.inputStreamBild);
//			System.out.println("Out:" + mangel.outputStreamBild);
			st.execute();
		}
		catch(Exception e){
			System.out.println(e.toString());
			System.out.println(e.getMessage());
			System.out.println(e.getCause());
			mangel = null;
		}
		GenericEntity<Maengel> myEntity = new GenericEntity<Maengel>(mangel) {};
		return Response.ok(myEntity).build();
	}
	
	@PUT
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("updateMangel")
	public Response updateMangel(List<Maengel> mangel){
		System.out.println("MaengelService/updateMangel... called.");
		try {	
			for(Maengel m : mangel){					
				if (m != null) {
					String str = "UPDATE Maengel "
							+ " SET beschreibung = ?, longitude = ?, latitude = ?, status = ? "
							+ " WHERE maengelId=" + m.maengelID;
					PreparedStatement st = connection.prepareStatement(str, Statement.RETURN_GENERATED_KEYS);
					st.setString(1, m.beschreibung);
					st.setDouble(2, m.longitude);
					st.setDouble(3, m.latitude);
					st.setString(4, m.status);
					st.execute();	
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
