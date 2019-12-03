package ws;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import entities.Lokation;

@WebService(endpointInterface = "ws.ILokationenService")
public class LokationenService implements ILokationenService{

	public Connection connection;
	public Statement statement;
	public ResultSet resultSet;
	
	@Override
	public List<Lokation> getAllLokationen() {
		List<Lokation> returnList;
		
		try {
			
			//registrieren
			Class.forName("com.mysql.jdbc.Driver"); 
			
			//verbinden
			//connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/GeoLocationProject?serverTimezone=UTC", "root", "");
			connection = DriverManager.getConnection("jdbc:mysql://sql7.freesqldatabase.com:3306/sql7314195", "sql7314195", "nriJqjZlcz");
			statement = connection.createStatement();
			resultSet = statement.executeQuery("select * from Lokationen");
			
			returnList = new ArrayList<Lokation>();
			while(resultSet.next()) {
				Lokation l = new Lokation();
				l.setLokationId(resultSet.getInt("lokationenId"));
				l.setBezeichnung(resultSet.getString("bezeichnung"));
				l.setLokationX(resultSet.getInt("koordinateX"));
				l.setLokationY(resultSet.getInt("koordinateY"));
				l.setKategorienId(resultSet.getInt("kategorienId"));
				returnList.add(l);
			}
		}
		catch(Exception e) {
			return null;
		}
		return returnList;
	}

}
