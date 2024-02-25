using Documenter
using SwapSort

@time makedocs(
    sitename = "SwapSort",
    format = Documenter.HTML(),
    modules = [SwapSort]
)

# Documenter can also automatically deploy documentation to gh-pages.
# See "Hosting Documentation" and deploydocs() in the Documenter manual
# for more information.
#=deploydocs(
    repo = "<repository url>"
)=#
