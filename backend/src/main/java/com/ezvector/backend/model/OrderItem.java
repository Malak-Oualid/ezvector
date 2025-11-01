package com.ezvector.backend.model;/*PLEASE DO NOT EDIT THIS CODE*/
/*This code was generated using the UMPLE 1.35.0.7523.c616a4dce modeling language!*/


import jakarta.persistence.*;

// line 50 "model.ump"
// line 145 "model.ump"
@Entity
public class OrderItem
{

  //------------------------
  // ENUMERATIONS
  //------------------------

  public enum OrderItemStatus { NOT_STARTED, IN_PROGRESS, COMPLETE }

  //------------------------
  // MEMBER VARIABLES
  //------------------------

  //OrderItem Attributes
    @Id
    @GeneratedValue
  private int orderItemID;
  private OrderItemStatus status;

  //OrderItem Associations
    @ManyToOne
  private Order correspondingOrder;
    @OneToOne
  private Plasmid correspondingPlasmid;

  //------------------------
  // CONSTRUCTOR
  //------------------------

  public OrderItem(int aOrderItemID, OrderItemStatus aStatus, Order aCorrespondingOrder, Plasmid aCorrespondingPlasmid)
  {
    orderItemID = aOrderItemID;
    status = aStatus;
    boolean didAddCorrespondingOrder = setCorrespondingOrder(aCorrespondingOrder);
    if (!didAddCorrespondingOrder)
    {
      throw new RuntimeException("Unable to create orderItem due to correspondingOrder. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
    boolean didAddCorrespondingPlasmid = setCorrespondingPlasmid(aCorrespondingPlasmid);
    if (!didAddCorrespondingPlasmid)
    {
      throw new RuntimeException("Unable to create correspondingOrderItem due to correspondingPlasmid. See https://manual.umple.org?RE002ViolationofAssociationMultiplicity.html");
    }
  }
  public OrderItem(){}

  //------------------------
  // INTERFACE
  //------------------------

  public boolean setOrderItemID(int aOrderItemID)
  {
    boolean wasSet = false;
    orderItemID = aOrderItemID;
    wasSet = true;
    return wasSet;
  }

  public boolean setStatus(OrderItemStatus aStatus)
  {
    boolean wasSet = false;
    status = aStatus;
    wasSet = true;
    return wasSet;
  }

  public int getOrderItemID()
  {
    return orderItemID;
  }

  public OrderItemStatus getStatus()
  {
    return status;
  }
  /* Code from template association_GetOne */
  public Order getCorrespondingOrder()
  {
    return correspondingOrder;
  }
  /* Code from template association_GetOne */
  public Plasmid getCorrespondingPlasmid()
  {
    return correspondingPlasmid;
  }
  /* Code from template association_SetOneToMandatoryMany */
  public boolean setCorrespondingOrder(Order aCorrespondingOrder)
  {
    boolean wasSet = false;
    //Must provide correspondingOrder to orderItem
    if (aCorrespondingOrder == null)
    {
      return wasSet;
    }

    if (correspondingOrder != null && correspondingOrder.numberOfOrderItems() <= Order.minimumNumberOfOrderItems())
    {
      return wasSet;
    }

    Order existingCorrespondingOrder = correspondingOrder;
    correspondingOrder = aCorrespondingOrder;
    if (existingCorrespondingOrder != null && !existingCorrespondingOrder.equals(aCorrespondingOrder))
    {
      boolean didRemove = existingCorrespondingOrder.removeOrderItem(this);
      if (!didRemove)
      {
        correspondingOrder = existingCorrespondingOrder;
        return wasSet;
      }
    }
    correspondingOrder.addOrderItem(this);
    wasSet = true;
    return wasSet;
  }
  /* Code from template association_SetOneToOptionalOne */
  public boolean setCorrespondingPlasmid(Plasmid aNewCorrespondingPlasmid)
  {
    boolean wasSet = false;
    if (aNewCorrespondingPlasmid == null)
    {
      //Unable to setCorrespondingPlasmid to null, as correspondingOrderItem must always be associated to a correspondingPlasmid
      return wasSet;
    }
    
    OrderItem existingCorrespondingOrderItem = aNewCorrespondingPlasmid.getCorrespondingOrderItem();
    if (existingCorrespondingOrderItem != null && !equals(existingCorrespondingOrderItem))
    {
      //Unable to setCorrespondingPlasmid, the current correspondingPlasmid already has a correspondingOrderItem, which would be orphaned if it were re-assigned
      return wasSet;
    }
    
    Plasmid anOldCorrespondingPlasmid = correspondingPlasmid;
    correspondingPlasmid = aNewCorrespondingPlasmid;
    correspondingPlasmid.setCorrespondingOrderItem(this);

    if (anOldCorrespondingPlasmid != null)
    {
      anOldCorrespondingPlasmid.setCorrespondingOrderItem(null);
    }
    wasSet = true;
    return wasSet;
  }

  public void delete()
  {
    Order placeholderCorrespondingOrder = correspondingOrder;
    this.correspondingOrder = null;
    if(placeholderCorrespondingOrder != null)
    {
      placeholderCorrespondingOrder.removeOrderItem(this);
    }
    Plasmid existingCorrespondingPlasmid = correspondingPlasmid;
    correspondingPlasmid = null;
    if (existingCorrespondingPlasmid != null)
    {
      existingCorrespondingPlasmid.setCorrespondingOrderItem(null);
    }
  }


  public String toString()
  {
    return super.toString() + "["+
            "orderItemID" + ":" + getOrderItemID()+ "]" + System.getProperties().getProperty("line.separator") +
            "  " + "status" + "=" + (getStatus() != null ? !getStatus().equals(this)  ? getStatus().toString().replaceAll("  ","    ") : "this" : "null") + System.getProperties().getProperty("line.separator") +
            "  " + "correspondingOrder = "+(getCorrespondingOrder()!=null?Integer.toHexString(System.identityHashCode(getCorrespondingOrder())):"null") + System.getProperties().getProperty("line.separator") +
            "  " + "correspondingPlasmid = "+(getCorrespondingPlasmid()!=null?Integer.toHexString(System.identityHashCode(getCorrespondingPlasmid())):"null");
  }
}