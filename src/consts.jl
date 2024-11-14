const SORTERS = [(2, 1, 1), (3, 3, 3), (4, 5, 3), (5, 9, 5), (6, 12, 5), (7, 16, 6), (8, 19, 6), (9, 25, 7), (10, 29, 8), (10, 31, 7), (11, 35, 8), (12, 39, 9), (12, 40, 8), (13, 45, 10), (13, 46, 9), (14, 51, 10), (14, 52, 9), (15, 56, 10), (15, 57, 9), (16, 60, 10), (16, 61, 9), (17, 71, 12), (17, 72, 11), (17, 74, 10), (18, 77, 12), (18, 78, 11), (19, 85, 12), (19, 87, 11), (20, 91, 12), (20, 93, 11), (21, 99, 15), (21, 100, 12), (22, 106, 13), (22, 107, 12), (23, 114, 14), (23, 115, 13), (23, 116, 12), (24, 120, 13), (24, 122, 12), (25, 130, 15), (25, 131, 13), (26, 138, 15), (26, 139, 14), (26, 141, 13), (27, 147, 16), (27, 148, 14), (28, 155, 14), (29, 164, 15), (29, 166, 14), (30, 172, 14), (31, 180, 14), (32, 185, 14), (33, 199, 16), (33, 200, 15), (34, 209, 17), (34, 210, 16), (34, 213, 15), (35, 220, 17), (35, 221, 16), (36, 227, 18), (36, 228, 17), (36, 229, 16), (37, 240, 17), (37, 243, 16), (38, 250, 17), (38, 255, 16), (39, 259, 17), (39, 263, 16), (40, 265, 17), (40, 269, 16), (41, 282, 19), (41, 283, 18), (41, 288, 17), (42, 291, 18), (42, 294, 17), (43, 303, 19), (43, 305, 17), (44, 309, 19), (44, 311, 17), (45, 324, 19), (45, 325, 18), (46, 332, 19), (46, 333, 18), (47, 340, 19), (47, 341, 18), (48, 346, 19), (48, 347, 18), (49, 365, 21), (49, 370, 20), (49, 371, 19), (50, 376, 21), (50, 379, 20), (50, 381, 19), (51, 387, 22), (51, 389, 20), (51, 396, 19), (52, 395, 20), (52, 407, 19), (53, 411, 22), (53, 412, 21), (53, 415, 20), (54, 421, 20), (55, 432, 20), (56, 438, 20), (57, 454, 21), (57, 461, 20), (58, 465, 21), (58, 471, 20), (59, 476, 21), (59, 480, 20), (60, 483, 21), (60, 489, 20), (61, 497, 22), (61, 498, 21), (61, 502, 20), (62, 506, 21), (62, 511, 20), (63, 515, 21), (63, 519, 20), (64, 521, 21), (64, 525, 20)]
const SORTERS_LENGTH = length(SORTERS)

"""
`const SORTERS = $(SORTERS)`

The list of all available sorters. The algorithms can be accessed via `swapsortN_L_D` for `(N,L,D)` in `SORTERS`. See also [`BESTSIZE`](@ref).
"""
SORTERS

const BESTSIZE = [(2, 1, 1), (3, 3, 3), (4, 5, 3), (5, 9, 5), (6, 12, 5), (7, 16, 6), (8, 19, 6), (9, 
25, 7), (10, 29, 8), (11, 35, 8), (12, 39, 9), (13, 45, 10), (14, 51, 10), (15, 56, 10), (16, 60, 10), (17, 71, 12), (18, 77, 12), (19, 85, 12), (20, 91, 12), (21, 99, 15), (22, 106, 13), (23, 114, 14), (24, 120, 13), (25, 130, 15), (26, 138, 15), (27, 147, 16), (28, 155, 14), (29, 164, 15), (30, 172, 14), (31, 180, 14), (32, 185, 14), (33, 199, 16), (34, 209, 17), (35, 220, 17), (36, 227, 18), (37, 240, 17), (38, 250, 17), (39, 259, 17), (40, 265, 17), (41, 282, 19), (42, 291, 18), (43, 303, 19), (44, 309, 19), (45, 324, 19), (46, 332, 19), (47, 340, 19), (48, 346, 19), (49, 365, 21), (50, 376, 21), (51, 387, 22), (52, 395, 20), (53, 411, 22), (54, 421, 20), (55, 432, 20), (56, 438, 20), (57, 454, 21), (58, 465, 21), (59, 476, 21), (60, 483, 21), (61, 497, 22), (62, 506, 21), (63, 515, 21), (64, 521, 21)]
const BESTSIZE_LENGTH = length(BESTSIZE)

"""
`const BESTSIZE = $(BESTSIZE)`

The list of sorters with the minimum sizes. These sorters are called by the general [`swapsort`](@ref). See also [`SORTERS`](@ref).
"""
BESTSIZE

const MAINPATH = (@__DIR__) * "/Sorters/"