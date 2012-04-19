/*
Online remote gestural interaction prototype by Memo Akten, www.memo.tv

On-site interactive installation tracks people moving in the space and broadcasts their motion onto the web, their movements visualised in realtime in web browsers around the world. Web viewers can watch, or further interact with the generative graphics.

Designed and developed during a 5-day residency at ScreenLab MediaCityUK 0x01, University of Salford, MediaCityUK

With support from Kit Turner, Elliot Woods, James George
Additional support from Alasdair Swenson, Sunjoy Prabakaran
Special thanks to Chris Allick and Seb Lee-Delisle.
Made with webgl and three.js by Ricardo Cabello aka MrDoob
*/

/* --------------------------------------------------------------------------
 * SimpleOpenNI User Test
 * --------------------------------------------------------------------------
 * Processing Wrapper for the OpenNI/Kinect library
 * http://code.google.com/p/simple-openni
 * --------------------------------------------------------------------------
 * prog:  Max Rheiner / Interaction Design / zhdk / http://iad.zhdk.ch/
 * date:  02/16/2011 (m/d/y)
 * ----------------------------------------------------------------------------
 */

import SimpleOpenNI.*;

import oscP5.*;
import netP5.*;
OscP5 oscP5;
NetAddress myRemoteLocation;

SimpleOpenNI  context;
boolean       autoCalib=true;
int           oldNumberOfUsers = 0;
int          activeUser = 0;

void setup() {
  context = new SimpleOpenNI(this);

  if (context.enableDepth() == false) {
    println("Can't open the depthMap, maybe the camera is not connected!"); 
    exit();
  }

  // enable skeleton generation for all joints
  context.enableUser(SimpleOpenNI.SKEL_PROFILE_ALL);

  background(200, 0, 0);

  stroke(0, 0, 255);
  strokeWeight(3);
  smooth();
  frameRate(30);
  myRemoteLocation = new NetAddress("127.0.0.1", 8000);
  oscP5 = new OscP5(this, 8001);  

  size(context.depthWidth(), context.depthHeight());
}


void draw()
{
  // update the cam
  context.update();

  // draw depthImageMap
  image(context.depthImage(), 0, 0);

//  int numberOfUsers = context.getNumberOfUsers();
//  if (numberOfUsers != oldNumberOfUsers) {
//    println("Number of users: " + numberOfUsers);
//    oldNumberOfUsers = numberOfUsers;
//  }
//  
  OscMessage m = new OscMessage("/screenlab/skeletonactive");
  m.add(activeUser);
  for(int i=0; i<6; i++) m.add(1);  // just to pad it and make compliant with original message
  oscP5.send(m, myRemoteLocation); 
  
  
  // draw the skeleton if it's available
//  for (int i=0; i<100; i++) {
    if (context.isTrackingSkeleton(activeUser)) drawSkeleton(activeUser);
//  }
}

void addJointToOSCMessage(OscMessage m, int user, int joint) {
  PVector jointPos = new PVector();
  context.getJointPositionSkeleton(user, joint, jointPos);
  m.add(jointPos.x);
  m.add(jointPos.y);
  m.add(jointPos.z);
}

// draw the skeleton with the selected joints
void drawSkeleton(int userId) {
    
  OscMessage m = new OscMessage("/screenlab/skeleton/" + userId);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_HEAD);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_NECK);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_LEFT_SHOULDER);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_LEFT_ELBOW);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_LEFT_HAND);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_RIGHT_SHOULDER);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_RIGHT_ELBOW);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_RIGHT_HAND);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_TORSO);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_LEFT_HIP);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_LEFT_KNEE);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_LEFT_FOOT);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_RIGHT_HIP);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_RIGHT_KNEE);
  addJointToOSCMessage(m, userId, SimpleOpenNI.SKEL_RIGHT_FOOT);
  oscP5.send(m, myRemoteLocation); 

  if (frameCount % 30 == 0) {
    PVector jointPos = new PVector();
    context.getJointPositionSkeleton(userId, SimpleOpenNI.SKEL_NECK, jointPos);
    println("Neck position for user " + userId + ": " + jointPos);
  }

  context.drawLimb(userId, SimpleOpenNI.SKEL_HEAD, SimpleOpenNI.SKEL_NECK);

  context.drawLimb(userId, SimpleOpenNI.SKEL_NECK, SimpleOpenNI.SKEL_LEFT_SHOULDER);
  context.drawLimb(userId, SimpleOpenNI.SKEL_LEFT_SHOULDER, SimpleOpenNI.SKEL_LEFT_ELBOW);
  context.drawLimb(userId, SimpleOpenNI.SKEL_LEFT_ELBOW, SimpleOpenNI.SKEL_LEFT_HAND);

  context.drawLimb(userId, SimpleOpenNI.SKEL_NECK, SimpleOpenNI.SKEL_RIGHT_SHOULDER);
  context.drawLimb(userId, SimpleOpenNI.SKEL_RIGHT_SHOULDER, SimpleOpenNI.SKEL_RIGHT_ELBOW);
  context.drawLimb(userId, SimpleOpenNI.SKEL_RIGHT_ELBOW, SimpleOpenNI.SKEL_RIGHT_HAND);

  context.drawLimb(userId, SimpleOpenNI.SKEL_LEFT_SHOULDER, SimpleOpenNI.SKEL_TORSO);
  context.drawLimb(userId, SimpleOpenNI.SKEL_RIGHT_SHOULDER, SimpleOpenNI.SKEL_TORSO);

  context.drawLimb(userId, SimpleOpenNI.SKEL_TORSO, SimpleOpenNI.SKEL_LEFT_HIP);
  context.drawLimb(userId, SimpleOpenNI.SKEL_LEFT_HIP, SimpleOpenNI.SKEL_LEFT_KNEE);
  context.drawLimb(userId, SimpleOpenNI.SKEL_LEFT_KNEE, SimpleOpenNI.SKEL_LEFT_FOOT);

  context.drawLimb(userId, SimpleOpenNI.SKEL_TORSO, SimpleOpenNI.SKEL_RIGHT_HIP);
  context.drawLimb(userId, SimpleOpenNI.SKEL_RIGHT_HIP, SimpleOpenNI.SKEL_RIGHT_KNEE);
  context.drawLimb(userId, SimpleOpenNI.SKEL_RIGHT_KNEE, SimpleOpenNI.SKEL_RIGHT_FOOT);
}

// -----------------------------------------------------------------
// SimpleOpenNI events

void onNewUser(int userId) {
  println("onNewUser - userId: " + userId);
  println("  start pose detection");

  if (autoCalib) context.requestCalibrationSkeleton(userId, true);
  else context.startPoseDetection("Psi", userId);
}

void onLostUser(int userId) {
  println("onLostUser - userId: " + userId);
}

void onStartCalibration(int userId) {
  println("onStartCalibration - userId: " + userId);
}

void onEndCalibration(int userId, boolean successfull) {
  println("onEndCalibration - userId: " + userId + ", successfull: " + successfull);

  if (successfull) { 
    println("  User calibrated !!!");
    context.startTrackingSkeleton(userId);
    activeUser = userId;
  } 
  else { 
    println("  Failed to calibrate user !!!");
    println("  Start pose detection");
    context.startPoseDetection("Psi", userId);
  }
}

void onStartPose(String pose, int userId) {
  println("onStartPose - userId: " + userId + ", pose: " + pose);
  println(" stop pose detection");

  context.stopPoseDetection(userId); 
  context.requestCalibrationSkeleton(userId, true);
}

void onEndPose(String pose, int userId) {
  println("onEndPose - userId: " + userId + ", pose: " + pose);
}

