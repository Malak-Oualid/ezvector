package com.ezvector.backend.model;/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.35.0.7523.c616a4dce modeling language!*/


import java.sql.Date;
import java.util.*;

// line 58 "model.ump"
// line 150 "model.ump"
public class Plasmid
{

  //------------------------
  // MEMBER VARIABLES
  //------------------------

  //Plasmid Attributes
  private String plasmidID;
  private String plasmidName;
  private String plasmidSequence;
  private int totalPlasmidPrice;
  private Date dateCreated;
  private boolean isSaved;

  //Plasmid Associations
  private List<Primer> primers;
  private Customer shopper;
  private OrderItem correspondingOrderItem;

  //------------------------
  // CONSTRUCTOR
  //------------------------

  public Plasmid(String aPlasmidID, String aPlasmidName, String aPlasmidSequence, int aTotalPlasmidPrice, Date aDateCreated, boolean aIsSaved)
  {
    plasmidID = aPlasmidID;
    plasmidName = aPlasmidName;
    plasmidSequence = aPlasmidSequence;
    totalPlasmidPrice = aTotalPlasmidPrice;
    dateCreated = aDateCreated;
    isSaved = aIsSaved;
    primers = new ArrayList<Primer>();
  }

  //------------------------
  // INTERFACE
  //------------------------

  public boolean setPlasmidID(String aPlasmidID)
  {
    boolean wasSet = false;
    plasmidID = aPlasmidID;
    wasSet = true;
    return wasSet;
  }

  public boolean setPlasmidName(String aPlasmidName)
  {
    boolean wasSet = false;
    plasmidName = aPlasmidName;
    wasSet = true;
    return wasSet;
  }

  public boolean setPlasmidSequence(String aPlasmidSequence)
  {
    boolean wasSet = false;
    plasmidSequence = aPlasmidSequence;
    wasSet = true;
    return wasSet;
  }

  public boolean setTotalPlasmidPrice(int aTotalPlasmidPrice)
  {
    boolean wasSet = false;
    totalPlasmidPrice = aTotalPlasmidPrice;
    wasSet = true;
    return wasSet;
  }

  public boolean setDateCreated(Date aDateCreated)
  {
    boolean wasSet = false;
    dateCreated = aDateCreated;
    wasSet = true;
    return wasSet;
  }

  public boolean setIsSaved(boolean aIsSaved)
  {
    boolean wasSet = false;
    isSaved = aIsSaved;
    wasSet = true;
    return wasSet;
  }

  public String getPlasmidID()
  {
    return plasmidID;
  }

  public String getPlasmidName()
  {
    return plasmidName;
  }

  public String getPlasmidSequence()
  {
    return plasmidSequence;
  }

  public int getTotalPlasmidPrice()
  {
    return totalPlasmidPrice;
  }

  public Date getDateCreated()
  {
    return dateCreated;
  }

  public boolean getIsSaved()
  {
    return isSaved;
  }
  /* Code from template attribute_IsBoolean */
  public boolean isIsSaved()
  {
    return isSaved;
  }
  /* Code from template association_GetMany */
  public Primer getPrimer(int index)
  {
    Primer aPrimer = primers.get(index);
    return aPrimer;
  }

  public List<Primer> getPrimers()
  {
    List<Primer> newPrimers = Collections.unmodifiableList(primers);
    return newPrimers;
  }

  public int numberOfPrimers()
  {
    int number = primers.size();
    return number;
  }

  public boolean hasPrimers()
  {
    boolean has = primers.size() > 0;
    return has;
  }

  public int indexOfPrimer(Primer aPrimer)
  {
    int index = primers.indexOf(aPrimer);
    return index;
  }
  /* Code from template association_GetOne */
  public Customer getShopper()
  {
    return shopper;
  }

  public boolean hasShopper()
  {
    boolean has = shopper != null;
    return has;
  }
  /* Code from template association_GetOne */
  public OrderItem getCorrespondingOrderItem()
  {
    return correspondingOrderItem;
  }

  public boolean hasCorrespondingOrderItem()
  {
    boolean has = correspondingOrderItem != null;
    return has;
  }
  /* Code from template association_MinimumNumberOfMethod */
  public static int minimumNumberOfPrimers()
  {
    return 0;
  }
  /* Code from template association_AddManyToOne */
  public Primer addPrimer()
  {
    return new Primer(this);
  }

  public boolean addPrimer(Primer aPrimer)
  {
    boolean wasAdded = false;
    if (primers.contains(aPrimer)) { return false; }
    Plasmid existingPlasmid = aPrimer.getPlasmid();
    boolean isNewPlasmid = existingPlasmid != null && !this.equals(existingPlasmid);
    if (isNewPlasmid)
    {
      aPrimer.setPlasmid(this);
    }
    else
    {
      primers.add(aPrimer);
    }
    wasAdded = true;
    return wasAdded;
  }

  public boolean removePrimer(Primer aPrimer)
  {
    boolean wasRemoved = false;
    //Unable to remove aPrimer, as it must always have a plasmid
    if (!this.equals(aPrimer.getPlasmid()))
    {
      primers.remove(aPrimer);
      wasRemoved = true;
    }
    return wasRemoved;
  }
  /* Code from template association_AddIndexControlFunctions */
  public boolean addPrimerAt(Primer aPrimer, int index)
  {  
    boolean wasAdded = false;
    if(addPrimer(aPrimer))
    {
      if(index < 0 ) { index = 0; }
      if(index > numberOfPrimers()) { index = numberOfPrimers() - 1; }
      primers.remove(aPrimer);
      primers.add(index, aPrimer);
      wasAdded = true;
    }
    return wasAdded;
  }

  public boolean addOrMovePrimerAt(Primer aPrimer, int index)
  {
    boolean wasAdded = false;
    if(primers.contains(aPrimer))
    {
      if(index < 0 ) { index = 0; }
      if(index > numberOfPrimers()) { index = numberOfPrimers() - 1; }
      primers.remove(aPrimer);
      primers.add(index, aPrimer);
      wasAdded = true;
    } 
    else 
    {
      wasAdded = addPrimerAt(aPrimer, index);
    }
    return wasAdded;
  }
  /* Code from template association_SetOptionalOneToMany */
  public boolean setShopper(Customer aShopper)
  {
    boolean wasSet = false;
    Customer existingShopper = shopper;
    shopper = aShopper;
    if (existingShopper != null && !existingShopper.equals(aShopper))
    {
      existingShopper.removeCustomerCart(this);
    }
    if (aShopper != null)
    {
      aShopper.addCustomerCart(this);
    }
    wasSet = true;
    return wasSet;
  }
  /* Code from template association_SetOptionalOneToOne */
  public boolean setCorrespondingOrderItem(OrderItem aNewCorrespondingOrderItem)
  {
    boolean wasSet = false;
    if (correspondingOrderItem != null && !correspondingOrderItem.equals(aNewCorrespondingOrderItem) && equals(correspondingOrderItem.getCorrespondingPlasmid()))
    {
      //Unable to setCorrespondingOrderItem, as existing correspondingOrderItem would become an orphan
      return wasSet;
    }

    correspondingOrderItem = aNewCorrespondingOrderItem;
    Plasmid anOldCorrespondingPlasmid = aNewCorrespondingOrderItem != null ? aNewCorrespondingOrderItem.getCorrespondingPlasmid() : null;

    if (!this.equals(anOldCorrespondingPlasmid))
    {
      if (anOldCorrespondingPlasmid != null)
      {
        anOldCorrespondingPlasmid.correspondingOrderItem = null;
      }
      if (correspondingOrderItem != null)
      {
        correspondingOrderItem.setCorrespondingPlasmid(this);
      }
    }
    wasSet = true;
    return wasSet;
  }

  public void delete()
  {
    for(int i=primers.size(); i > 0; i--)
    {
      Primer aPrimer = primers.get(i - 1);
      aPrimer.delete();
    }
    if (shopper != null)
    {
      Customer placeholderShopper = shopper;
      this.shopper = null;
      placeholderShopper.removeCustomerCart(this);
    }
    OrderItem existingCorrespondingOrderItem = correspondingOrderItem;
    correspondingOrderItem = null;
    if (existingCorrespondingOrderItem != null)
    {
      existingCorrespondingOrderItem.delete();
    }
  }


  public String toString()
  {
    return super.toString() + "["+
            "plasmidID" + ":" + getPlasmidID()+ "," +
            "plasmidName" + ":" + getPlasmidName()+ "," +
            "plasmidSequence" + ":" + getPlasmidSequence()+ "," +
            "totalPlasmidPrice" + ":" + getTotalPlasmidPrice()+ "," +
            "isSaved" + ":" + getIsSaved()+ "]" + System.getProperties().getProperty("line.separator") +
            "  " + "dateCreated" + "=" + (getDateCreated() != null ? !getDateCreated().equals(this)  ? getDateCreated().toString().replaceAll("  ","    ") : "this" : "null") + System.getProperties().getProperty("line.separator") +
            "  " + "shopper = "+(getShopper()!=null?Integer.toHexString(System.identityHashCode(getShopper())):"null") + System.getProperties().getProperty("line.separator") +
            "  " + "correspondingOrderItem = "+(getCorrespondingOrderItem()!=null?Integer.toHexString(System.identityHashCode(getCorrespondingOrderItem())):"null");
  }
}