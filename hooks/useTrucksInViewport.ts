import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Trucks } from "@/types";

interface ViewportBounds {
  topLat: number;
  bottomLat: number;
  leftLng: number;
  rightLng: number;
}

export function useTrucksInViewport(bounds: ViewportBounds | null) {
  const trucks = useQuery(
    api.trucks.getTrucksInViewport,
    bounds
      ? {
          topLat: bounds.topLat,
          bottomLat: bounds.bottomLat,
          leftLng: bounds.leftLng,
          rightLng: bounds.rightLng,
        }
      : "skip" // Skip fetching if bounds are not yet ready
  );

  return trucks;
}
