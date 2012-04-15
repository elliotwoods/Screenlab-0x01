#region usings
using System;
using System.ComponentModel.Composition;

using VVVV.PluginInterfaces.V1;
using VVVV.PluginInterfaces.V2;
using VVVV.Utils.VColor;
using VVVV.Utils.VMath;

using VVVV.Core.Logging;
#endregion usings

namespace VVVV.Nodes
{
	#region PluginInfo
	[PluginInfo(Name = "MakeRotate", Category = "Quaternion", Help = "Basic template with one value in/out", Tags = "")]
	#endregion PluginInfo
	public class QuaternionMakeRotateNode : IPluginEvaluate
	{
		#region fields & pins
		[Input("From")]
		ISpread<Vector3D> FFrom;

		[Input("To")]
		ISpread<Vector3D> FTo;

		[Output("Output")]
		ISpread<Vector4D> FOutput;

		[Import()]
		ILogger FLogger;
		#endregion fields & pins

		//called when data for any output pin is requested
		public void Evaluate(int SpreadMax)
		{
			FOutput.SliceCount = SpreadMax;

			for (int i = 0; i < SpreadMax; i++)
			{
				FOutput[i] = MakeRotate(FFrom[i], FTo[i]);
			}
		}
		
		//from openFrameworks
		private Vector4D MakeRotate(Vector3D from, Vector3D to)
		{
			Vector4D quat = new Vector4D();
			Vector3D sourceVector = from / from.Length;
			Vector3D targetVector = to / to.Length;
		
			// Now let's get into the real stuff
			// Use "dot product plus one" as test as it can be re-used later on
		
			double dotProdPlus1 = 1.0 +  sourceVector.dot(targetVector);
		
		
			// Check for degenerate case of full u-turn. Use epsilon for detection
			if (dotProdPlus1 < 1e-7) {
		
				// Get an orthogonal vector of the given vector
				// in a plane with maximum vector coordinates.
				// Then use it as quaternion axis with pi angle
				// Trick is to realize one value at least is >0.6 for a normalized vector.
				if (fabs(sourceVector.x) < 0.6) {
					const double norm = sqrt(1.0 - sourceVector.x * sourceVector.x);
					_v.x = 0.0;
					_v.y = sourceVector.z / norm;
					_v.z = -sourceVector.y / norm;
					_v.w = 0.0;
				} else if (fabs(sourceVector.y) < 0.6) {
					const double norm = sqrt(1.0 - sourceVector.y * sourceVector.y);
					_v.x = -sourceVector.z / norm;
					_v.y = 0.0;
					_v.z = sourceVector.x / norm;
					_v.w = 0.0;
				} else {
					const double norm = sqrt(1.0 - sourceVector.z * sourceVector.z);
					_v.x = sourceVector.y / norm;
					_v.y = -sourceVector.x / norm;
					_v.z = 0.0;
					_v.w = 0.0;
				}
			}
		
			else {
				// Find the shortest angle quaternion that transforms normalized vectors
				// into one other. Formula is still valid when vectors are colinear
				const double s = sqrt(0.5 * dotProdPlus1);
				const ofVec3f tmp = sourceVector.getCrossed(targetVector) / (2.0 * s);
				_v.x = tmp.x;
				_v.y = tmp.y;
				_v.z = tmp.z;
				_v.w = s;
			}
			return quat;
		}
	}
}
