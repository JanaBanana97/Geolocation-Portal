package ws;

public class ILokationenServiceProxy implements ws.ILokationenService {
  private String _endpoint = null;
  private ws.ILokationenService iLokationenService = null;
  
  public ILokationenServiceProxy() {
    _initILokationenServiceProxy();
  }
  
  public ILokationenServiceProxy(String endpoint) {
    _endpoint = endpoint;
    _initILokationenServiceProxy();
  }
  
  private void _initILokationenServiceProxy() {
    try {
      iLokationenService = (new ws.LokationenServiceServiceLocator()).getLokationenServicePort();
      if (iLokationenService != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)iLokationenService)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)iLokationenService)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (iLokationenService != null)
      ((javax.xml.rpc.Stub)iLokationenService)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public ws.ILokationenService getILokationenService() {
    if (iLokationenService == null)
      _initILokationenServiceProxy();
    return iLokationenService;
  }
  
  public ws.Lokation[] getAllLokationen() throws java.rmi.RemoteException{
    if (iLokationenService == null)
      _initILokationenServiceProxy();
    return iLokationenService.getAllLokationen();
  }
  
  
}